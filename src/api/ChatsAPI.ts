import BaseAPI from './BaseAPI';

export default class ChatsAPI extends BaseAPI {
	constructor() {
		super('/chats');
	}

	request(): Promise<unknown> {
		return this.http.get('/');
	}

	requestToken(chatId: number): Promise<unknown> {
		return this.http.post(`/token/${chatId}`);
	}

	create = undefined;
	update = undefined;
	delete = undefined;
}
