import Block from '../../utils/Block';
import template from './modal.pug';
import './modal.scss';

interface ModalProps {
	title?: string;
	content: Block[];
	close: () => void;
}

export default class Modal extends Block {
	constructor(props: ModalProps) {
		super({
			...props,
			events: {
				click: (e: PointerEvent) => {
					const el = e.target as HTMLElement;

					if (
						el.classList.contains('modal__close-button') ||
						el.classList.contains('modal__overlay')
					) {
						props.close();
					}
				},
			},
		});
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
