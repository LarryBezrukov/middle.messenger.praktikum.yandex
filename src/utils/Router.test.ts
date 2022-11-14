import { expect } from 'chai';
import sinon from 'sinon';
import Router, { BlockConstructable } from './Router';

describe('Router', () => {
	const router = new Router();

	// @ts-ignore
	global.window.history.back = () => {
		if (typeof window.onpopstate === 'function') {
			window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
		}
	};
	global.window.history.forward = () => {
		if (typeof window.onpopstate === 'function') {
			window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
		}
	};

	const getContentFake = sinon.fake.returns(document.createElement('div'));

	const MockBlock = class {
		getContent = getContentFake;
	} as unknown as BlockConstructable;

	describe('.use()', () => {
		it('should return Router instance', () => {
			const result = router.use('/', MockBlock);

			expect(result).to.eq(router);
		});
	});

	describe('.back()', () => {
		it('should render a page on history back action', () => {
			window.location.pathname = '/signup';

			router.use('/', MockBlock).start();

			window.location.pathname = '/';

			router.back();

			expect(getContentFake.callCount).to.eq(3);
		});
	});
});
