import Block from '../../utils/Block';
import template from './button.pug';
import './button.scss';

interface ButtonProps {
	label: string;
	type: string;
	classes?: string;
	disabled?: boolean;
	events?: {
		click: () => void;
	};
}

export default class Button extends Block<ButtonProps> {
	constructor(props: ButtonProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
