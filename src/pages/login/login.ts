import Block from '../../utils/Block';
import template from './login.pug';
import { Input } from '../../components/Input/input';
import { Button } from '../../components/Button/button';
import { Form } from '../../components/Form/form';
import './login.scss';

export default class LoginPage extends Block {
	protected initChildren() {
		this.children.form = new Form({
			formInputs: [
				new Input({
					label: 'Username',
					type: 'text',
					id: 'login',
					name: 'login',
					placeholder: 'Enter your username',
				}),
				new Input({
					label: 'Password',
					type: 'password',
					id: 'password',
					name: 'password',
					placeholder: '••••••••',
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
