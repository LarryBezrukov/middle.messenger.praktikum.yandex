import Block from '../../utils/Block';
import { withRouter, WithRouterProps } from '../../utils/Router';
import template from './link.pug';
import './link.scss';

interface LinkProps extends WithRouterProps {
	text: string;
	to?: string;
	action?: () => void;
}

class Link extends Block {
	constructor({ to, action, router, ...props }: LinkProps) {
		super({
			...props,
			to,
			events: {
				click: (e: MouseEvent) => {
					e.preventDefault();

					if (to) {
						router.go(to);
						return;
					}

					if (action) {
						action();
					}
				},
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

export default withRouter(Link);
