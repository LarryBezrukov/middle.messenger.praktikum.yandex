import Block from '../../utils/Block';
import AuthController from '../../controllers/AuthController';
import { SignInData } from '../../api/AuthAPI';
import { ValidationType } from '../../utils/Validator';
import Form from '../../components/Form/form';
import InputGroup from '../../components/InputGroup/inputGroup';
import Button from '../../components/Button/button';
import Link from '../../components/Link/link';
import template from './signin.pug';

export default class SigninPage extends Block {
	protected initChildren() {
		this.children.form = new Form({
			formInputs: [
				new InputGroup({
					label: 'Login',
					type: 'text',
					id: 'login',
					name: 'login',
					placeholder: 'Enter your login',
					validation: ValidationType.Login,
				}),
				new InputGroup({
					label: 'Password',
					type: 'password',
					id: 'password',
					name: 'password',
					placeholder: '••••••••',
					validation: ValidationType.Password,
				}),
			],
			formButton: new Button({
				label: 'Log in',
				classes: 'form__button',
				type: 'submit',
			}),
			events: {
				submit: this.formSubmitHandler.bind(this),
			},
		});

		this.children.link = new Link({
			text: "Don't have an account yet?",
			to: '/signup',
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

		await AuthController.signIn(data as unknown as SignInData);

		formEl.reset();
	}

	render() {
		return this.compile(template, {});
	}
}
