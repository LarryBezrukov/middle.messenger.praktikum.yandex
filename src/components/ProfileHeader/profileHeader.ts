import template from '@components/profileHeader/profileHeader.pug';
import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
import './profileHeader.scss';

class ProfileHeader extends Block {
	constructor(props: any) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(ProfileHeader);
