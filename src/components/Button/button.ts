import Block from '../../utils/Block';
import template from './button.pug';
import './button.scss';

interface ButtonProps {
	label: string;
	classes: string | string[];
	type: string;
	events?: {
		click: () => void;
	};
}

export default class Button extends Block {
	constructor(props: ButtonProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
