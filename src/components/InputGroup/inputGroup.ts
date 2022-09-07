import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import Input from '../Input/input';
import InputError from '../InputError/inputError';
import template from './inputGroup.pug';
import './inputGroup.scss';

interface InputGroupProps {
	label: string;
	type: string;
	id: string;
	name: string;
	placeholder: string;
	validation?: string;
}

export default class InputGroup extends Block {
	protected initChildren() {
		const { type, id, name, placeholder } = this.props;

		this.children.input = new Input({
			type,
			id,
			name,
			placeholder,
			events: {
				focus: this.validateInput.bind(this),
				blur: this.validateInput.bind(this),
			},
		});

		this.children.error = new InputError({
			errorText: '',
		});
	}

	constructor(props: InputGroupProps) {
		super(props);
	}

	validateInput() {
		const input = this.children.input as Block;
		const error = this.children.error as Block;
		const { value } = input._element as HTMLInputElement;

		const [isValid, message] = Validator.validate(this.props.validation, value);

		error.setProps({
			errorText: isValid ? '' : message,
		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
