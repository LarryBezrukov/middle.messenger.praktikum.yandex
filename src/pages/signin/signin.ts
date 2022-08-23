import Block from '../../utils/Block';
import template from './signin.pug';
import Form from '../../components/Form/form';
import InputGroup from '../../components/InputGroup/inputGroup';
import Button from '../../components/Button/button';
import Link from '../../components/Link/Link';
import AuthController from '../../controllers/AuthController';
import { SignInData } from '../../api/AuthAPI';
import { withUser } from '../profile/profile';

class SigninPage extends Block {
	protected initChildren() {
		this.children.form = new Form({
			formInputs: [
				new InputGroup({
					label: 'Username',
					type: 'text',
					id: 'login',
					name: 'login',
					placeholder: 'Enter your username',
					validation: 'login',
				}),
				new InputGroup({
					label: 'Password',
					type: 'password',
					id: 'password',
					name: 'password',
					placeholder: '••••••••',
					validation: 'password',
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

		const { formInputs } = this.children.form.children as unknown as Record<string, Block[]>;

		formInputs.forEach((input: InputGroup) => {
			input.validateInput();
		});

		await AuthController.signIn(data as unknown as SignInData);
	}

	render() {
		return this.compile(template, {});
	}
}

export default withUser(SigninPage);
