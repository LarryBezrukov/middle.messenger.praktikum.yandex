import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
import Button from '../Button/button';
import Form from '../Form/form';
import InputGroup from '../InputGroup/inputGroup';
import Link from '../Link/link';
import Modal from '../Modal/modal';
import template from './messageAreaHeader.pug';
import './messageAreaHeader.scss';

class MessageAreaHeader extends Block {
	protected initChildren() {
		this.children.AddUserLink = new Link({
			text: 'Add user to chat',
			action: this.openAddUserModal.bind(this),
		});

		this.children.AddUserModal = new Modal({
			title: 'Add user to chat',
			content: new Form({
				formInputs: [
					new InputGroup({
						label: 'User ID',
						type: 'number',
						id: 'userId',
						name: 'userId',
						placeholder: 'Enter ID of the user to add',
						validation: 'id',
					}),
				],
				formButton: new Button({
					label: 'Add user',
					type: 'submit',
				}),
				events: {
					submit: this.addUserToChat.bind(this),
				},
			}),
			close: this.closeAddUserModal.bind(this),
		});
	}

	constructor() {
		super({
			addUserModal: {
				idOpen: false,
			},
		});
	}

	openAddUserModal() {
		this.setProps({
			addUserModal: {
				isOpen: true,
			},
		});
	}

	closeAddUserModal() {
		this.setProps({
			addUserModal: {
				isOpen: false,
			},
		});
	}

	addUserToChat(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());

		const userId = Number(data.userId);

		ChatsController.addUsersToChat({
			users: [userId],
			chatId: this.props.id,
		});

		this.closeAddUserModal();
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

const withCurrentChat = withStore((state) => ({
	...state.currentChat,
}));

export default withCurrentChat(MessageAreaHeader);
