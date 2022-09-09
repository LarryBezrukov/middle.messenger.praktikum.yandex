import Block from '../../utils/Block';
import template from './chat.pug';
import store from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';
import WS from '../../utils/WS';
import ChatList from '../../components/ChatList/chatList';
import MessageArea from '../../components/MessageArea/messageArea';
import Profile from '../../components/Profile/profile';
import './chat.scss';

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

export default ChatPage;
