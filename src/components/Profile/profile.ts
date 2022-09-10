import Block from '../../utils/Block';
import AuthController from '../../controllers/AuthController';
import UsersController from '../../controllers/UsersController';
import { PasswordData, UserData } from '../../api/UsersAPI';
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
			action: this.openEditProfileModal.bind(this),
		});

		this.children.ChangePasswordButton = new Link({
			text: 'Change password',
			action: this.openChangePasswordModal.bind(this),
		});

		this.children.LogoutButton = new Link({
			text: 'Log out',
			className: 'profile__logout-button',
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
							value: this.props.email,
						}),
						new InputGroup({
							label: 'Login',
							type: 'text',
							id: 'login',
							name: 'login',
							placeholder: 'Choose a login',
							validation: 'login',
							value: this.props.login,
						}),
						new InputGroup({
							label: 'Dsiplay name',
							type: 'text',
							id: 'display_name',
							name: 'display_name',
							placeholder: 'Choose a display name',
							validation: 'login',
							value: this.props.display_name,
						}),
						new InputGroup({
							label: 'First name',
							type: 'text',
							id: 'first_name',
							name: 'first_name',
							placeholder: 'Enter your first name',
							validation: 'name',
							value: this.props.first_name,
						}),
						new InputGroup({
							label: 'Last name',
							type: 'text',
							id: 'second_name',
							name: 'second_name',
							placeholder: 'Enter your last name',
							validation: 'name',
							value: this.props.second_name,
						}),
						new InputGroup({
							label: 'Phone number',
							type: 'tel',
							id: 'phone',
							name: 'phone',
							placeholder: '+7 (999) 999 99 99',
							validation: 'phone',
							value: this.props.phone,
						}),
					],
					formButton: new Button({
						label: 'Save',
						type: 'submit',
					}),
					events: {
						submit: this.editProfile.bind(this),
					},
				}),
			],
			close: this.closeEditProfileModal.bind(this),
		});

		this.children.ChangePasswordModal = new Modal({
			content: [
				new ProfileHeader(),
				new Form({
					formInputs: [
						new InputGroup({
							label: 'Old password',
							type: 'password',
							id: 'oldPassword',
							name: 'oldPassword',
							placeholder: '••••••••',
							validation: 'password',
						}),
						new InputGroup({
							label: 'New password',
							type: 'password',
							id: 'newPassword',
							name: 'newPassword',
							placeholder: '••••••••',
							validation: 'password',
						}),
						new InputGroup({
							label: 'Repeat new password',
							type: 'password',
							id: 'confirmPassword',
							name: 'confirmPassword',
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
			close: this.closeChangePasswordModal.bind(this),
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

	openEditProfileModal() {
		this.setProps({
			editProfileModal: {
				isOpen: true,
			},
		});
	}

	closeEditProfileModal() {
		this.setProps({
			editProfileModal: {
				isOpen: false,
			},
		});
	}

	openChangePasswordModal() {
		this.setProps({
			changePasswordModal: {
				isOpen: true,
			},
		});
	}

	closeChangePasswordModal() {
		this.setProps({
			changePasswordModal: {
				isOpen: false,
			},
		});
	}

	async editProfile(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());

		await UsersController.changeProfile(data as unknown as UserData);

		this.closeEditProfileModal();
	}

	async changePassword(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());

		const form = e.target as HTMLFormElement;

		await UsersController.changePassword(data as unknown as PasswordData);

		this.closeChangePasswordModal();
		form.reset();
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(Profile);
