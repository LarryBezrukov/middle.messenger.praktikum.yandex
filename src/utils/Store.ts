import Block from './Block';
import { EventBus } from './EventBus';
import { isEqual, set } from './helpers';

export enum StoreEvents {
	Updated = 'updated',
}

export interface UserInterface {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string | null;
	login: string;
	email: string;
	phone: string;
	avatar: string | null;
}

export interface ChatInterface {
	id: number;
	title: string;
	avatar: string | null;
	created_by: string;
	unread_count: number;
	last_message: LastMessageInterface;
}

interface CurrentChatInterface {
	id: number | null;
	messages: MessageInterface[] | null;
}

export interface MessageInterface {
	id: number;
	chat_id: number;
	user_id: number;
	content: string;
	is_read: boolean;
	time: string;
	type: string;
	file: Record<string, string | number> | null;
}

interface LastMessageInterface {
	id: number;
	user: UserInterface;
	time: string;
	content: string;
}

interface StoreData {
	currentUser?: UserInterface;
	chats?: ChatInterface[];
	currentChat?: CurrentChatInterface;
	profilePanel?: {
		isOpen: true | false;
	};
}

export class Store extends EventBus {
	private state: StoreData = {};

	public getState() {
		return this.state;
	}

	public set(path: string, value: unknown) {
		set(this.state, path, value);

		this.emit(StoreEvents.Updated);
	}
}

const store = new Store();

export const withStore =
	(mapStateToProps: (state: StoreData) => Record<string, unknown>) => (Component: typeof Block) => {
		let state: any;

		return class extends Component {
			constructor(props?: any) {
				state = mapStateToProps(store.getState());

				super({ ...props, ...state });

				store.on(StoreEvents.Updated, () => {
					const newState = mapStateToProps(store.getState());

					if (!isEqual(state, newState)) {
						this.setProps({
							...newState,
						});
					}
				});
			}
		};
	};

export default store;
