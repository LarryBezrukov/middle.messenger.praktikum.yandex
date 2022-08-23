import Block from '../../utils/Block';
import template from './chat.pug';
import ChatList from '../../components/ChatList/chatList';
import Chat from '../../components/Chat/chat';
import MessageArea from '../../components/MessageArea/messageArea';
import { ChatInterface, withStore } from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';
import WS from '../../utils/WS';
import './chat.scss';

class ChatPage extends Block {
	protected initChildren() {
		this.children.chatList = new ChatList({
			chats: this.props.chats.map(
				(chat: ChatInterface) =>
					new Chat({
						...chat,
						events: {
							click: () => {
								this.onChatSelect(chat.id);
							},
						},
					}),
			),
		});

		this.children.messageArea = new MessageArea();
	}

	private activeConnections: WS[];

	constructor(props: any) {
		super(props);
		this.activeConnections = [];
	}

	async onChatSelect(chatId: number) {
		if (this.activeConnections.length) {
			this.activeConnections.forEach((ws) => ws.close());
			this.activeConnections = [];
		}

		await ChatsController.requestToken(chatId);

		const ws = new WS(
			this.props.currentUser.id,
			this.props.currentChat.id,
			this.props.currentChat.token,
		);

		this.activeConnections.push(ws);

		ws.send({
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
