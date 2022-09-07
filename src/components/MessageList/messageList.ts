import Block from '../../utils/Block';
import { withStore, MessageInterface } from '../../utils/Store';
import { formatTime } from '../../utils/helpers';
import Message from '../Message/message';
import template from './messageList.pug';
import './messageList.scss';

class MessageList extends Block {
	constructor(props: any) {
		super(props);
	}

	renderMessages() {
		if (this.props.currentChat) {
			this.children.Messages = this.props.currentChat.messages.map((message: MessageInterface) => {
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
	currentUserId: state.currentUser!.id,
	currentChat: state.currentChat,
}));

export default withMessages(MessageList);
