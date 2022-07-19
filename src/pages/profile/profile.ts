import Block from '../../utils/Block';
import template from './profile.pug';
import { ChatList } from '../../components/ChatList/chatList';
import { ChatPlaceholder } from '../../components/ChatPlaceholder/chatPlaceholder';
import './profile.scss';

export default class ProfilePage extends Block {
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
