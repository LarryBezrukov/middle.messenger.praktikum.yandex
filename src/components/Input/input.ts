import Block from '../../utils/Block';
import template from './input.pug';
import './input.scss';

interface InputProps {
	type: string;
	id: string;
	name: string;
	placeholder: string;
	events: {
		focus: (e: InputEvent) => void;
		blur: (e: InputEvent) => void;
	};
}

export class Input extends Block {
	constructor(props: InputProps) {
		super(props);
	}

	render() {
		return this.compile(template, this.props);
	}
}
