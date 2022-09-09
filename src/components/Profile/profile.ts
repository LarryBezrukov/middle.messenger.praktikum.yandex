import Block from '../../utils/Block';
import AuthController from '../../controllers/AuthController';
import { withStore } from '../../utils/Store';
import ProfileHeader from '../ProfileHeader/profileHeader';
import Link from '../Link/link';
import Modal from '../Modal/modal';
import Form from '../Form/form';
import InputGroup from '../InputGroup/inputGroup';
import Button from '../Button/button';
import template from './profile.pug';
import './profile.scss';

class Profile extends Block {
	protected initChildren() {
		this.children.ProfileHeader = new ProfileHeader();

		this.children.EditProfileButton = new Link({
			text: 'Edit profile',
			action: () =>
				this.setProps({
					editProfileModal: {
						isOpen: true,
					},
				}),
		});

		this.children.ChangePasswordButton = new Link({
			text: 'Cahnge password',
			action: () =>
				this.setProps({
					changePasswordModal: {
						isOpen: true,
					},
				}),
		});

		this.children.LogoutLink = new Link({
			text: 'Log out',
			action: () => AuthController.logOut(),
		});

		this.children.EditProfileModal = new Modal({
			content: [
				new ProfileHeader(),
				new Form({
					formInputs: [
						new InputGroup({
							label: 'Email',
							type: 'email',
							id: 'email',
							name: 'email',
							placeholder: 'mail@example.com',
							validation: 'email',
						}),
						new InputGroup({
							label: 'Username',
							type: 'text',
							id: 'login',
							name: 'login',
							placeholder: 'Choose a username',
							validation: 'login',
						}),
						new InputGroup({
							label: 'First name',
							type: 'text',
							id: 'first_name',
							name: 'first_name',
							placeholder: 'Enter your first name',
							validation: 'name',
						}),
						new InputGroup({
							label: 'Last name',
							type: 'text',
							id: 'second_name',
							name: 'second_name',
							placeholder: 'Enter your last name',
							validation: 'name',
						}),
						new InputGroup({
							label: 'Phone number',
							type: 'tel',
							id: 'phone',
							name: 'phone',
							placeholder: '+7 (999) 999 99 99',
							validation: 'phone',
						}),
					],
					formButton: new Button({
						label: 'Save',
						type: 'submit',
					}),
					events: {
						submit: this.updateProfile.bind(this),
					},
				}),
			],
			close: () =>
				this.setProps({
					editProfileModal: {
						isOpen: false,
					},
				}),
		});

		this.children.ChangePasswordModal = new Modal({
			content: [
				new ProfileHeader(),
				new Form({
					formInputs: [
						new InputGroup({
							label: 'Password',
							type: 'password',
							id: 'password',
							name: 'password',
							placeholder: '••••••••',
							validation: 'password',
						}),
						new InputGroup({
							label: 'Repeat password',
							type: 'password',
							id: 'confirm_password',
							name: 'confirm_password',
							placeholder: '••••••••',
							validation: 'password',
						}),
					],
					formButton: new Button({
						label: 'Save',
						type: 'submit',
					}),
					events: {
						submit: this.changePassword.bind(this),
					},
				}),
			],
			close: () =>
				this.setProps({
					changePasswordModal: {
						isOpen: false,
					},
				}),
		});
	}

	constructor(props: any) {
		super({
			...props,
			editProfileModal: {
				isOpen: false,
			},
			changePasswordModal: {
				isOpen: false,
			},
		});
	}

	updateProfile(e: SubmitEvent) {
		e.preventDefault();

		console.log('Edit profile');
	}

	changePassword(e: SubmitEvent) {
		e.preventDefault();

		console.log('Cahnge password');
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

export const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(Profile);
