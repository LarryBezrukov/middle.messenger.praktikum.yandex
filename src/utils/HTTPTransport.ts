enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type Options = {
	method: Method;
	data?: any;
};

export default class HTTPTransport {
	static API_URL = 'https://ya-praktikum.tech/api/v2';
	protected endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
	}

	public get<Response>(path = '/'): Promise<Response> {
		return this.request(this.endpoint + path);
	}

	public post<Response = void>(path: string, data?: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.POST,
			data,
		});
	}

	public put<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.PUT,
			data,
		});
	}

	public delete<Response>(path: string): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.DELETE,
		});
	}

	private request<Response>(
		url: string,
		options: Options = { method: Method.GET },
	): Promise<Response> {
		const { method, data } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, url);

			xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status < 400) {
						resolve(xhr.response);
					} else {
						reject(xhr.response);
					}
				}
			};

			xhr.onabort = () => reject;
			xhr.onerror = () => reject;
			xhr.ontimeout = () => reject;

			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.withCredentials = true;
			xhr.responseType = 'json';

			if (method === Method.GET || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	}
}
