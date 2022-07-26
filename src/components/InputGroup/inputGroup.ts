import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import { Input } from '../Input/input';
import { InputError } from '../InputError/inputError';
import template from './inputGroup.pug';
import './inputGroup.scss';

interface InputGroupProps {
	label: string;
	type: string;
	id: string;
	name: string;
	placeholder: string;
	validation: string;
}

export class InputGroup extends Block {
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
		const { value } = this.children.input._element as HTMLInputElement;

		const [isValid, message] = Validator.validate(this.props.validation, value);

		this.children.error.setProps({
			errorText: isValid ? '' : message,
		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
