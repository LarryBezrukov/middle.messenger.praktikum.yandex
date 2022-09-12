import Block from '../../utils/Block';
import template from './message.pug';
import './message.scss';

interface MessageProps {
	id: number;
	chat_id: number;
	user_id: number;
	type: string;
	is_read: boolean;
	file: Record<string, string | number> | null;
	content: string;
	time: string;
	className: 'message_incoming' | 'message_outgoing';
}

export default class Message extends Block {
	constructor(props: MessageProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
