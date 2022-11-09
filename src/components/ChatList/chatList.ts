import Block from '../../utils/Block';
import ChatsController from '../../controllers/ChatsController';
import store, { ChatInterface, UserInterface, withStore } from '../../utils/Store';
import { ValidationType } from '../../utils/Validator';
import WS from '../../utils/WS';
import Link from '../Link/link';
import Chat from '../Chat/chat';
import Modal from '../Modal/modal';
import Form from '../Form/form';
import InputGroup from '../InputGroup/inputGroup';
import Button from '../Button/button';
import template from './chatList.pug';
// import './chatList.scss';

interface ChatListProps {
	chats: ChatInterface[];
	currentUser: UserInterface;
}

class ChatList extends Block<ChatListProps> {
	protected initChildren() {
		this.children.NewChatLink = new Link({
			text: 'New chat',
			className: 'chat-list__newchat-link',
			action: this.openNewChatModal.bind(this),
		});

		this.children.OpenProfileLink = new Link({
			text: 'Profile',
			action: () =>
				store.set(
					'profilePanel.isOpen',
					store.getState().profilePanel === undefined
						? true
						: !store.getState().profilePanel!.isOpen,
				),
		});

		this.children.NewChatModal = new Modal({
			title: 'Create new chat',
			content: [
				new Form({
					formInputs: [
						new InputGroup({
							label: 'Chat name',
							type: 'text',
							id: 'chatName',
							name: 'chatName',
							placeholder: 'Enter chat name',
							validation: ValidationType.ChatName,
						}),
					],
					formButton: new Button({
						label: 'Create chat',
						type: 'submit',
					}),
					events: {
						submit: this.createNewChat.bind(this),
					},
				}),
			],
			close: this.closeNewChatModal.bind(this),
		});
	}

	constructor(props: any) {
		super({
			...props,
			newChatModal: {
				isOpen: false,
			},
		});
	}

	renderChats() {
		if (this.props.chats) {
			this.children.Chats = this.props.chats.map(
				(chat: ChatInterface) =>
					new Chat({
						...chat,
						events: {
							click: () => this.selectChat(chat.id),
						},
					}),
			);
		}
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

	openNewChatModal() {
		this.setProps({
			newChatModal: {
				isOpen: true,
			},
		});
	}

	closeNewChatModal() {
		this.setProps({
			newChatModal: {
				isOpen: false,
			},
		});
	}

	async createNewChat(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());

		await ChatsController.createChat({
			title: data.chatName as string,
		});

		await ChatsController.getChats();
		this.renderChats();

		this.closeNewChatModal();
	}

	render() {
		this.renderChats();
		return this.compile(template, { ...this.props });
	}
}

const withUserAndChats = withStore((state) => ({
	chats: state.chats,
	currentUser: { ...state.currentUser },
}));

export default withUserAndChats(ChatList as typeof Block);
