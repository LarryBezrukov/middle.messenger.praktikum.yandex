import { ChatInterface } from '../utils/Store';
import BaseAPI from './BaseAPI';

export interface ChatData {
	title: string;
}

export interface AddUsersData {
	users: number[];
	chatId: number;
}

interface Token {
	token: string;
}

export default class ChatsAPI extends BaseAPI {
	constructor() {
		super('/chats');
	}

	request(): Promise<ChatInterface[]> {
		return this.http.get('/');
	}

	requestToken(chatId: number): Promise<Token> {
		return this.http.post(`/token/${chatId}`);
	}

	createChat(data: ChatData): Promise<void> {
		return this.http.post('/', data);
	}

	addUsers(data: AddUsersData): Promise<void> {
		return this.http.put('/users', data);
	}

	create = undefined;
	update = undefined;
	delete = undefined;
}
