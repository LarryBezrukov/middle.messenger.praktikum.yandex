import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import type BlockType from './Block';

const mockEventBus = {
	on: sinon.fake(),
	emit: sinon.fake(),
};

const { default: Block } = proxyquire('./Block', {
	'./EventBus': {
		EventBus: class {
			emit = mockEventBus.emit;
			on = mockEventBus.on;
		},
	},
}) as { default: typeof BlockType };

describe('Block', () => {
	class MockComponent extends Block {}

	it('should fire init event on initialization', () => {
		new MockComponent({});

		expect(mockEventBus.emit.calledWith('init')).to.eq(true);
	});
});
