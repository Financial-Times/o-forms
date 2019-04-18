/* eslint-env mocha, sinon, proclaim */

import proclaim from 'proclaim';
import * as fixtures from './helpers/fixtures';

const State = require('../src/js/state');

describe('State', () => {
	let inputList;
	let sandbox;
	let state;
	let stateClass;

	before(() => {
		sandbox = document.createElement('div');
		document.body.appendChild(sandbox);

		stateClass = (state) => inputList[0].closest('.o-forms-input').classList.contains(`o-forms-input--${state}`);
	});

	after(() => {
		document.body.removeChild(sandbox);
		inputList = null;
	});

	context('new instance', () => {
		it('initialises a state instance successfully', () => {
			sandbox.innerHTML = fixtures.stateField;
			inputList = document.body.querySelectorAll('input');
			state = new State(inputList);

			proclaim.isInstanceOf(state, State);
		});

		it('throws an error if input type is not `o-forms-input--radio-box`', () => {
			sandbox.innerHTML = fixtures.field;
			inputList = document.body.querySelectorAll('input');

			let message = 'State can only be set on radio inputs with a box style (o-forms-input--radio-box).';
			proclaim.throws(() => new State(inputList), message);
		});
	});

	context('.set()', () => {
		before(() => {
			sandbox.innerHTML = fixtures.stateField;
			inputList = document.body.querySelectorAll('input');
			state = new State(inputList);
		});

		it('`saving` state', () => {
			state.set('saving');
			proclaim.isTrue(stateClass('saving'));
		});

		it('`saved` state', () => {
			state.set('saved');
			proclaim.isFalse(stateClass('saving'));
			proclaim.isTrue(stateClass('saved'));
		});

		it('`none` state', () => {
			state.set('none');
			proclaim.isFalse(stateClass('saving'));
			proclaim.isFalse(stateClass('saved'));
		});
	});
});
