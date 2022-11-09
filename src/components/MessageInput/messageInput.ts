import Block from '../../utils/Block';
import template from './messageInput.pug';
// import './messageInput.scss';

export default class MessageInput extends Block {
	constructor() {
		super();
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
