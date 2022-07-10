enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type Options = {
	method: METHOD;
	headers?: { [key: string]: string };
	data?: any;
	timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: any) {
	if (typeof data !== 'object') {
		throw new Error('Data must be an object');
	}

	const keys = Object.keys(data);
	return keys.reduce(
		(result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
		'?',
	);
}

export class HTTPTransport {
	get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: METHOD.GET }, options.timeout);
	}

	post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
	}

	put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
	}

	delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
	}

	request(
		url: string,
		options: Options = { method: METHOD.GET },
		timeout = 5000,
	): Promise<XMLHttpRequest> {
		const { method, headers = {}, data } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, method === METHOD.GET && !!data ? `${url}${queryStringify(data)}` : url);

			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = () => {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (method === METHOD.GET || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	}
}
