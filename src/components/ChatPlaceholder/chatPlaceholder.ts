import Block from '../../utils/Block';
import template from './chatPlaceholder.pug';
import './chatPlaceholder.scss';

export default class ChatPlaceholder extends Block {
	render() {
		return this.compile(template, {});
	}
}
