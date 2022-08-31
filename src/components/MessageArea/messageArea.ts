import Block from '../../utils/Block';
import template from './messageArea.pug';
import { withStore } from '../../utils/Store';
import Message from '../Message/message';
import MessageInput from '../MessageInput/messageInput';
import './messageArea.scss';

interface MessageAreaProps {
	userId: number;
}

interface MessageInterface {
	id: number;
	user_id: number;
	chat_id: number;
	type: string;
	time: string;
	content: string;
	is_read: boolean;
	file: Record<string, string | number> | null;
}

class MessageArea extends Block {
	protected initChildren() {
		this.children.messageInput = new MessageInput();
	}

	constructor(props: MessageAreaProps) {
		super(props);
	}

	returnMessages(): Block[] {
		if (this.props.messages) {
			return this.props.messages.map((message: MessageInterface) => {
				const dateAndTime = this.formatTime(message.time);

				return new Message({
					...message,
					time: dateAndTime,
					className:
						this.props.userId === message.user_id ? 'message_outgoing' : 'message_incoming',
				});
			});
		}

		return [];
	}

	private formatTime(time: string) {
		const parsedTime = Date.parse(time);
		return new Date(parsedTime).toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		});
	}

	render() {
		this.children.messageList = this.returnMessages();
		return this.compile(template, { ...this.props });
	}
}

const withMessages = withStore((state) => ({ ...state.currentChat }));

export default withMessages(MessageArea);
