import Block from '../../utils/Block';
import template from './messageInputField.pug';
import './messageInputField.scss';

interface MessageInputFieldProps {
	events: {
		keyup?: () => void;
	};
}

export default class MessageInputField extends Block {
	constructor() {
		super();
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
