import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
import WS from '../../utils/WS';
import MessageInput from '../MessageInput/messageInput';
import template from './messageArea.pug';
import './messageArea.scss';

class MessageArea extends Block {
	protected initChildren() {
		this.children.messageInput = new MessageInput();
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

const withCurrentChat = withStore((state) => ({ ...state.currentChat }));

export default MessageArea;
