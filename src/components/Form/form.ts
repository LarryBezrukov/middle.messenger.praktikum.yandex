import Block from '../../utils/Block';
import template from './form.pug';
import './form.scss';

interface FormProps {
	formInputs: Block[];
	formButton: Block;
	events: {
		submit: (e: InputEvent) => void;
	};
}

export default class Form extends Block<FormProps> {
	constructor(props: FormProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
