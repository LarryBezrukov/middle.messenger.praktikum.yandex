import BaseAPI from './BaseAPI';

export interface ChatData {
	title: string;
}

export interface AddUsersData {
	users: number[];
	chatId: number;
}

export default class ChatsAPI extends BaseAPI {
	constructor() {
		super('/chats');
	}

	request(): Promise<unknown> {
		return this.http.get('/');
	}

	requestToken(chatId: number): Promise<Record<string, string>> {
		return this.http.post(`/token/${chatId}`);
	}

	createChat(data: ChatData): Promise<unknown> {
		return this.http.post('/', data);
	}

	addUsers(data: AddUsersData): Promise<unknown> {
		return this.http.put('/users', data);
	}

	create = undefined;
	update = undefined;
	delete = undefined;
}
