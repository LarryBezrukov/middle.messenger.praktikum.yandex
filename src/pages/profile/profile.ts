import Block from '../../utils/Block';
import template from './profile.pug';
import ChatList from '../../components/ChatList/chatList';
import Link from '../../components/Link/link';
import { withStore } from '../../utils/Store';
import './profile.scss';

class ProfilePage extends Block {
	protected initChildren() {
		this.children.chatList = new ChatList({
			chats: [],
		});

		this.children.link = new Link({
			text: 'Log out!!!',
			action: 'logout',
		});
	}

	render() {
		return this.compile(template, {});
	}
}

export const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(ProfilePage);
