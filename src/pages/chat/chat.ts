import Block from '../../utils/Block';
import template from './chat.pug';
import { ChatList } from '../../components/ChatList/chatList';
import { ChatPlaceholder } from '../../components/ChatPlaceholder/chatPlaceholder';
import './chat.scss';

export default class ChatPage extends Block {
	protected initChildren() {
		this.children.chatList = new ChatList({
			chats: [
				new ChatPlaceholder(),
				new ChatPlaceholder(),
				new ChatPlaceholder(),
				new ChatPlaceholder(),
				new ChatPlaceholder(),
				new ChatPlaceholder(),
			],
		});
	}

	render() {
		return this.compile(template, {});
	}
}
