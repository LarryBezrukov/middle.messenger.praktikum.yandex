import Block from '../../utils/Block';
import { ChatInterface, withStore } from '../../utils/Store';
import template from './chat.pug';
import './chat.scss';

interface ChatProps extends ChatInterface {
	events: {
		click: () => void;
	};
}

class Chat extends Block {
	constructor(props: ChatProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

const withMessages = withStore((state) => ({ currentChatId: state.currentChat?.id }));

export default withMessages(Chat);
