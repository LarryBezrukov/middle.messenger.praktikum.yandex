import Block from '../../utils/Block';
import template from './home.pug';
import './home.scss';

export default class HomePage extends Block {
	render() {
		return this.compile(template, {});
	}
}
