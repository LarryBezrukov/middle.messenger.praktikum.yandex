import Block from '../../utils/Block';
import template from './login.pug';
import { Form } from '../../components/Form/form';
import { InputGroup } from '../../components/InputGroup/inputGroup';
import { Input } from '../../components/Input/input';
import { Button } from '../../components/Button/button';
import './login.scss';

export default class LoginPage extends Block {
	protected initChildren() {
		this.children.form = new Form({
			formInputs: [
				new InputGroup({
					label: 'Username',
					input: new Input({
						type: 'text',
						id: 'login',
						name: 'login',
						placeholder: 'Enter your username',
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
			],
			formButton: new Button({
				label: 'Log in',
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
