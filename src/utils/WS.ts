import store from './Store';

/* eslint-disable no-console */
enum Events {
	open = 'open',
	close = 'close',
	message = 'message',
	error = 'error',
}

interface Data {
	content?: string;
	type: 'message' | 'get old' | 'ping';
}

class WS {
	static WS_URL = 'wss://ya-praktikum.tech/ws/chats';
	private socket: WebSocket;
	private activeConnections: WebSocket[];
	private messages: Record<string, unknown>[];
	private keepAliveIntervalId: number;

	constructor() {
		this.activeConnections = [];
		this.keepAliveIntervalId = 0;
	}

	public async send(data: Data) {
		if (this.socket.readyState !== this.socket.OPEN) {
			try {
				await this.waitForOpenConnection();
				this.socket.send(JSON.stringify(data));
			} catch (err) {
				console.error(err);
			}
		} else {
			this.socket.send(JSON.stringify(data));
		}
	}

	public close(code?: number, reason?: string) {
		this.socket.close(code, reason);
	}

	private keepAlive() {
		const intervalTime = 20000;

		this.keepAliveIntervalId = window.setInterval(() => {
			if (this.socket.readyState === this.socket.OPEN) {
				this.send({
					type: 'ping',
				});
			}
		}, intervalTime);
	}

	private cancelKeepAlive() {
		if (this.keepAliveIntervalId) {
			clearInterval(this.keepAliveIntervalId);
		}
	}

	private waitForOpenConnection() {
		return new Promise<void>((resolve, reject) => {
			const maxNumberOfAttempts = 10;
			const intervalTime = 200;

			let currentAttempt = 0;
			const interval = setInterval(() => {
				if (this.socket.readyState === this.socket.OPEN) {
					clearInterval(interval);
					resolve();
				} else if (currentAttempt > maxNumberOfAttempts - 1) {
					clearInterval(interval);
					reject(new Error('Maximum number of attempts exceeded'));
				}
				currentAttempt++;
			}, intervalTime);
		});
	}

	public connect(userId: number, chatId: number, token: string) {
		if (this.socket !== undefined) {
			this.socket.removeEventListener(Events.open, this.openEventHandler);
			this.socket.removeEventListener(Events.close, this.closeEventHandler);
			this.socket.removeEventListener(Events.error, this.errorEventHandler);
			this.socket.removeEventListener(Events.message, this.messageEventHandler);
			this.socket.close();
		}

		if (this.activeConnections.length) {
			this.activeConnections.forEach((ws) => ws.close());
			this.activeConnections = [];
		}

		this.cancelKeepAlive();

		const endpoint = `${WS.WS_URL}/${userId}/${chatId}/${token}`;

		this.socket = new WebSocket(endpoint);
		this.activeConnections.push(this.socket);
		this.socket.addEventListener(Events.open, this.openEventHandler);
		this.socket.addEventListener(Events.close, this.closeEventHandler);
		this.socket.addEventListener(Events.error, this.errorEventHandler);
		this.socket.addEventListener(Events.message, this.messageEventHandler);
	}

	private openEventHandler = () => {
		console.log('Соединение установлено');
		this.keepAlive();
	};

	private closeEventHandler = (event: CloseEvent) => {
		if (event.wasClean) {
			console.log('Соединение закрыто чисто');
		} else {
			console.log('Обрыв соединения');
		}

		console.log(`Код: ${event.code} | Причина: ${event.reason}`);
	};

	private errorEventHandler = (event: ErrorEvent) => console.log('Ошибка', event.message);

	private messageEventHandler = (event: MessageEvent) => {
		const data = JSON.parse(event.data);

		console.log('Получены данные', data);

		if (Array.isArray(data)) {
			this.messages = data;
			store.set('currentChat.messages', this.messages);
		}

		if (data.type === 'message') {
			this.messages.unshift(data);
			store.set('currentChat.messages', this.messages);
		}
	};
}

export default new WS();
