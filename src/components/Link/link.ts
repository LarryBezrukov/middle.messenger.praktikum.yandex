import Block from '../../utils/Block';
import { withRouter, WithRouterProps } from '../../utils/Router';
import template from './link.pug';
import './link.scss';

interface LinkProps extends WithRouterProps {
	text: string;
	to: string;
}

class Link extends Block {
	constructor({ to, router, ...props }: LinkProps) {
		super({
			...props,
			to,
			events: {
				click: (e: MouseEvent) => {
					e.preventDefault();

					router.go(to);
				},
			},
		});
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default withRouter(Link);
