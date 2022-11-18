type Handler = (...args: unknown[]) => void;

export class EventBus {
	private listeners: Record<string, Handler[]> = {};

	public on(event: string, callback: Handler): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	public off(event: string, callback: Handler): void {
		this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
	}

	public emit(event: string, ...args: unknown[]): void {
		if (!this.listeners[event]) {
			return;
		}

		this.listeners[event].forEach((listener) => {
			listener(...args);
		});
	}
}
