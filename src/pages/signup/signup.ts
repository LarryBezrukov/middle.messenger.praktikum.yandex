import Block from '../../utils/Block';
import template from './signup.pug';
import { InputGroup } from '../../components/InputGroup/inputGroup';
import { Button } from '../../components/Button/button';
import { Form } from '../../components/Form/form';
import './signup.scss';

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
					id: 'fist_name',
					name: 'fist_name',
					placeholder: 'Enter your first name',
					validation: 'name',
				}),
				new InputGroup({
					label: 'Last name',
					type: 'text',
					id: 'last_name',
					name: 'last_name',
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
					id: 'repreat_password',
					name: 'repeat_password',
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
	}

	formSubmitHandler(e: InputEvent) {
		e.preventDefault();

		const data = new FormData(e.target as HTMLFormElement);
		const value = Object.fromEntries(data.entries());
		// eslint-disable-next-line no-console
		console.log(value);

		const { formInputs } = this.children.form.children as unknown as Record<string, Block[]>;

		formInputs.forEach((input: InputGroup) => {
			input.validateInput();
		});
	}

	render() {
		return this.compile(template, {});
	}
}
