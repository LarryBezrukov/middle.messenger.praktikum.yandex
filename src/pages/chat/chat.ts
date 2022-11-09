import Block from '../../utils/Block';
import store, { withStore } from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';
import WS from '../../utils/WS';
import ChatList from '../../components/ChatList/chatList';
import MessageArea from '../../components/MessageArea/messageArea';
import Profile from '../../components/Profile/profile';
import template from './chat.pug';
// import './chat.scss';

class ChatPage extends Block {
	protected initChildren() {
		this.children.ChatList = new ChatList();
		this.children.MessageArea = new MessageArea();
		this.children.Profile = new Profile();
	}

	constructor(props: any) {
		super(props);
	}

	async selectChat(chatId: number) {
		const token = await ChatsController.getToken(chatId);

		WS.connect(this.props.currentUser.id, chatId, token);

		WS.send({
			content: '0',
			type: 'get old',
		});

		store.set('currentChat.id', chatId);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

const withProfilePanel = withStore((state) => ({ profilePanel: state.profilePanel }));

export default withProfilePanel(ChatPage);
