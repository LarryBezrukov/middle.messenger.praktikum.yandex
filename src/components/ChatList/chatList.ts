import Block from '../../utils/Block';
import template from './chatList.pug';
import './chatList.scss';

interface ChatListProps {
	chats: Block[];
}

export default class ChatList extends Block {
	constructor(props: ChatListProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
