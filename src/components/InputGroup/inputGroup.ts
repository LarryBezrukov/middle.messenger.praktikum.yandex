import Block from '../../utils/Block';
import template from './inputGroup.pug';
import './inputGroup.scss';

interface InputGroupProps {
	label: string;
	input: Block;
}

export class InputGroup extends Block {
	constructor(props: InputGroupProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
