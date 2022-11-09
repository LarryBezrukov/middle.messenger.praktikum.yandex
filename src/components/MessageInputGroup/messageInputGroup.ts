import Block from '../../utils/Block';
import template from './messageInputGroup.pug';
import WS from '../../utils/WS';
import MessageInput from '../MessageInput/messageInput';
// import './messageInputGroup.scss';

export default class MessageInputGroup extends Block {
	protected initChildren() {
		this.children.messageField = new MessageInput();
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

		const form = e.target as HTMLFormElement;

		WS.send({
			content: data.message as string,
			type: 'message',
		});

		form.reset();
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
