import Block from '../../utils/Block';
import { MessageInterface, withStore } from '../../utils/Store';
import { formatTime } from '../../utils/helpers';
import Message from '../Message/message';
import MessageInputGroup from '../MessageInputGroup/messageInputGroup';
import MessageAreaHeader from '../MessageAreaHeader/MessageAreaHeader';
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
						this.props.currentUserId === message.user_id ? 'message_outgoing' : 'message_incoming',
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
	currentUserId: state.currentUser!.id,
}));

export default withMessages(MessageArea);
