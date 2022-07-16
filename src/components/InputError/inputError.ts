import Block from '../../utils/Block';
import template from './inputError.pug';
import './inputError.scss';

interface InputErrorProps {
	errorText: string;
}

export class InputError extends Block {
	constructor(props: InputErrorProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
