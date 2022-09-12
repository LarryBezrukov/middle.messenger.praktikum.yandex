import Block from '../../utils/Block';
import { MessageInterface, withStore } from '../../utils/Store';
import { formatTime } from '../../utils/helpers';
import MessageAreaHeader from '../MessageAreaHeader/messageAreaHeader';
import MessageInputGroup from '../MessageInputGroup/messageInputGroup';
import Message from '../Message/message';
import template from './messageArea.pug';
import './messageArea.scss';

interface MessageAreaProps {
	userId: number;
}

class MessageArea extends Block {
	protected initChildren() {
		this.children.MessageAreaHeader = new MessageAreaHeader();
		this.children.MessageInput = new MessageInputGroup();
	}

	constructor(props: MessageAreaProps) {
		super(props);
	}

	renderMessages() {
		if (this.props.messages) {
			this.children.MessageList = this.props.messages.map((message: MessageInterface) => {
				const dateAndTime = formatTime(message.time);

				return new Message({
					...message,
					time: dateAndTime,
					className:
						this.props.currentUser.id === message.user_id ? 'message_outgoing' : 'message_incoming',
				});
			});
		}

		return [];
	}

	render() {
		this.renderMessages();
		return this.compile(template, { ...this.props });
	}
}

const withMessages = withStore((state) => ({
	...state.currentChat,
	currentUser: { ...state.currentUser },
}));

export default withMessages(MessageArea);
