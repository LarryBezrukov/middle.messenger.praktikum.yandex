import Block from '../../utils/Block';
import template from './chat.pug';
import ChatList from '../../components/ChatList/chatList';
import Chat from '../../components/Chat/chat';
import MessageArea from '../../components/MessageArea/messageArea';
import { ChatInterface, withStore } from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';
import './chat.scss';
import WS from '../../utils/WS';

class ChatPage extends Block {
	protected initChildren() {
		this.children.chatList = new ChatList({
			chats: this.props.chats.map(
				(chat: ChatInterface) =>
					new Chat({
						...chat,
						events: {
							click: () => this.selectChat(chat.id),
						},
					}),
			),
		});

		this.children.messageArea = new MessageArea({
			userId: this.props.currentUser.id,
		});
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
	}

	render() {
		return this.compile(template, {});
	}
}

const withUserAndChats = withStore((state) => ({ ...state }));

export default withUserAndChats(ChatPage);
