import Block from '../../utils/Block';
import template from './messageInput.pug';
import WS from '../../utils/WS';
import MessageInputField from '../MessageInputField/MessageInputField';
import './messageInput.scss';

export default class MessageInput extends Block {
	protected initChildren() {
		this.children.messageField = new MessageInputField();
	}

	constructor() {
		super();

		this.setProps({
			events: {
				submit: this.sendMessage.bind(this),
			},
		});
	}

	sendMessage(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());

		WS.send({
			content: data.message as string,
			type: 'message',
		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
