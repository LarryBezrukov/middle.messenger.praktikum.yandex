import Block from '../../utils/Block';
import template from './error.pug';
import './error.scss';

interface ErrorProps {
	errorCode: number;
	errorDescription: string;
}

export default class ErrorPage extends Block {
	constructor(props: ErrorProps) {
		super(props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
