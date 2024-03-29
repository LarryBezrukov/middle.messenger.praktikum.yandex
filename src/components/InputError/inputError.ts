import Block from '../../utils/Block';
import template from './inputError.pug';
import './inputError.scss';

interface InputErrorProps {
	errorText: string;
}

export default class InputError extends Block<InputErrorProps> {
	constructor(props: InputErrorProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
