import Block from '../../utils/Block';
import AuthController, { ControllerSignUpData } from '../../controllers/AuthController';
import Form from '../../components/Form/form';
import InputGroup from '../../components/InputGroup/inputGroup';
import Button from '../../components/Button/button';
import Link from '../../components/Link/link';
import template from './signup.pug';

export default class SignupPage extends Block {
	protected initChildren() {
		this.children.form = new Form({
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
					label: 'Login',
					type: 'text',
					id: 'login',
					name: 'login',
					placeholder: 'Choose a login',
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
				label: 'Sign up',
				classes: 'form__button',
				type: 'submit',
			}),
			events: {
				submit: this.formSubmitHandler.bind(this),
			},
		});

		this.children.link = new Link({
			text: 'Already a user?',
			to: '/signin',
		});
	}

	async formSubmitHandler(e: SubmitEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());

		const formEl = e.target as HTMLFormElement;

		const form = this.children.form as Block;
		const formInputs = form.children.formInputs as Block[];

		formInputs.forEach((input: InputGroup) => {
			input.validateInput();
		});

		await AuthController.signUp(data as unknown as ControllerSignUpData);

		formEl.reset();
	}

	render() {
		return this.compile(template, {});
	}
}
