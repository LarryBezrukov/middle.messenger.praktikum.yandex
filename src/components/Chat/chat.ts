import Block from '../../utils/Block';
import { ChatInterface } from '../../utils/Store';
import template from './chat.pug';
import './chat.scss';

interface ChatProps extends ChatInterface {
	events: {
		click: () => void;
	};
}

export default class Chat extends Block {
	constructor(props: ChatProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
