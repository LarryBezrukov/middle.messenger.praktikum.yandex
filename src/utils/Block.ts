import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

export default class Block<P extends object = any> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	public id = nanoid(6);

	protected props: P;
	public children: Record<string, Block | Block[]>;
	public _element: HTMLElement | null = null;

	private eventBus: () => EventBus;

	constructor(propsAndChildren = {} as P) {
		const eventBus = new EventBus();
		const { props, children } = this._getPropsChildren(propsAndChildren);

		this.children = children;
		this.props = this._makePropsProxy(props) as P;

		this.initChildren();
		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _getPropsChildren(propsAndChildren: P) {
		const props: Record<string, unknown> = {};
		const children: Record<string, Block | Block[]> = {};

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { props: props as P, children };
	}

	protected initChildren() {}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	init() {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount() {
		this.componentDidMount();
	}

	componentDidMount() {}

	dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps: P, newProps: P) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	componentDidUpdate(_oldProps: P, _newProps: P) {
		return true;
	}

	setProps = (nextProps: P) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element(): HTMLElement | null {
		return this._element;
	}

	set element(target) {
		this._element = target;
	}

	private _render() {
		const fragment = this.render();

		const newElement = fragment.firstElementChild as HTMLElement;

		if (this._element) {
			this._removeEvents();
			this._element.replaceWith(newElement);
		}

		this._element = newElement;

		this._addEvents();
	}

	protected render(): DocumentFragment {
		return new DocumentFragment();
	}

	getContent(): HTMLElement | null {
		return this.element;
	}

	private _makePropsProxy(props: P) {
		return new Proxy(props as unknown as object, {
			get: (target: Record<string, unknown>, prop: string) => {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target: Record<string, unknown>, prop: string, value: unknown) => {
				target[prop] = value;
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);

				return true;
			},
			deleteProperty: () => {
				throw new Error('Нет доступа');
			},
		});
	}

	private _removeEvents() {
		const { events } = this.props as any;

		if (!events || !this._element) {
			return;
		}

		Object.keys(events).forEach((eventName) => {
			this._element?.removeEventListener(eventName, events[eventName]);
		});
	}

	private _addEvents() {
		const { events } = this.props as any;

		if (!events) {
			return;
		}

		Object.keys(events).forEach((eventName) => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	private _createDocumentElement(tagName: string): HTMLElement {
		return document.createElement(tagName);
	}

	compile(template: (locals: any) => string, locals: any) {
		const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				locals[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`);

				return;
			}

			locals[key] = `<div data-id="id-${child.id}"></div>`;
		});

		const htmlString = template({ ...locals, children: this.children });

		fragment.innerHTML = htmlString;

		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((ch) => {
					const stub = fragment.content.querySelector(`[data-id="id-${ch.id}"]`);

					if (!stub) {
						return;
					}
					stub.replaceWith(ch.getContent() as HTMLElement);
				});

				return;
			}

			const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

			if (!stub) {
				return;
			}

			stub.replaceWith(child.getContent() as HTMLElement);
		});

		return fragment.content;
	}
}
