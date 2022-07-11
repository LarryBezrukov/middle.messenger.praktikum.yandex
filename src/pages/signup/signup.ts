import Block from '../../utils/Block';
import template from './signup.pug';
import { InputGroup } from '../../components/InputGroup/inputGroup';
import { Input } from '../../components/Input/input';
import { Button } from '../../components/Button/button';
import { Form } from '../../components/Form/form';
import './signup.scss';

export default class SignupPage extends Block {
	protected initChildren() {
		this.children.form = new Form({
			formInputs: [
				new InputGroup({
					label: 'Email',
					input: new Input({
						type: 'email',
						id: 'email',
						name: 'email',
						placeholder: 'mail@example.com',
						events: {
							focus: () => console.log('Focus'),
							blur: () => console.log('Blur'),
						},
					}),
				}),
				new InputGroup({
					label: 'Username',
					input: new Input({
						type: 'text',
						id: 'username',
						name: 'username',
						placeholder: 'Choose a username',
						events: {
							focus: () => console.log('Focus'),
							blur: () => console.log('Blur'),
						},
					}),
				}),
				new InputGroup({
					label: 'First name',
					input: new Input({
						type: 'text',
						id: 'fist_name',
						name: 'fist_name',
						placeholder: 'Enter your first name',
						events: {
							focus: () => console.log('Focus'),
							blur: () => console.log('Blur'),
						},
					}),
				}),
				new InputGroup({
					label: 'Last name',
					input: new Input({
						type: 'text',
						id: 'last_name',
						name: 'last_name',
						placeholder: 'Enter your last name',
						events: {
							focus: () => console.log('Focus'),
							blur: () => console.log('Blur'),
						},
					}),
				}),
				new InputGroup({
					label: 'Phone number',
					input: new Input({
						type: 'tel',
						id: 'phone',
						name: 'phone',
						placeholder: '+7 (999) 999 99 99',
						events: {
							focus: () => console.log('Focus'),
							blur: () => console.log('Blur'),
						},
					}),
				}),
				new InputGroup({
					label: 'Password',
					input: new Input({
						type: 'password',
						id: 'password',
						name: 'password',
						placeholder: '••••••••',
						events: {
							focus: () => console.log('Focus'),
							blur: () => console.log('Blur'),
						},
					}),
				}),
				new InputGroup({
					label: 'Repeat password',
					input: new Input({
						type: 'password',
						id: 'repreat_password',
						name: 'repeat_password',
						placeholder: '••••••••',
						events: {
							focus: () => console.log('Focus'),
							blur: () => console.log('Blur'),
						},
					}),
				}),
			],
			formButton: new Button({
				label: 'Sign up',
				classes: 'form__button',
				type: 'submit',
			}),
			events: {
				submit: (e) => this.submitHandler(e),
			},
		});
	}

	render() {
		return this.compile(template, {});
	}
}
