/* eslint-env mocha, sinon, proclaim */

import proclaim from 'proclaim';
import * as fixtures from './helpers/fixtures';

const Input = require('../src/js/input');

describe('Input', () => {
	let dispatch;
	let inputEl;
	let inputContainer;
	let containerClass;
	let sandbox;

	beforeEach(() => {
		sandbox = document.createElement('div');
		document.body.appendChild(sandbox);

		dispatch = (event, element) => element.dispatchEvent(new Event(event));
		containerClass = (validity) => inputContainer.classList.contains(`o-forms-input--${validity}`);
	});

	afterEach(() => {
		document.body.removeChild(sandbox);
		inputContainer = null;
	});

	it('validation ignores an input that is not required or invalid', () =>{
		sandbox.innerHTML = fixtures.field;
		inputContainer = document.body.querySelector('.o-forms-input');
		inputEl = inputContainer.querySelector('input');
		new Input(inputContainer);

		proclaim.isFalse(containerClass('invalid'));
		proclaim.isFalse(containerClass('valid'));
	});

	context('validates required fields', () => {
		beforeEach(() => {
			sandbox.innerHTML = fixtures.requiredField;
			inputContainer = document.body.querySelector('.o-forms-input');
			inputEl = inputContainer.querySelector('input');
			new Input(inputContainer);
		});

		it('`blur` event sets the field to invalid if required input is left empty', () => {
			dispatch('blur', inputEl);

			proclaim.isTrue(containerClass('invalid'));
		});

		it('`input` event updates validity when input is given (if previously invalid)', () => {
			dispatch('blur', inputEl);
			proclaim.isTrue(containerClass('invalid'));

			inputEl.value = "some text";
			dispatch('input', inputEl);

			proclaim.isFalse(containerClass('invalid'));
			proclaim.isTrue(containerClass('valid'));
		});
	});

	context('validates pattern-matching fields', () => {
		beforeEach(() => {
			sandbox.innerHTML = fixtures.fieldWithPattern;
			inputContainer = document.body.querySelector('.o-forms-input');
			inputEl = inputContainer.querySelector('input');
			new Input(inputContainer);
		});

		it('`blur` event sets the field to invalid if input does not match pattern', () => {
			inputEl.value = "tenth";
			dispatch('blur', inputEl);

			proclaim.isTrue(containerClass('invalid'));
		});

		it('`input` event updates validity when format is corrected(if previously invalid)', () => {
			inputEl.value = 'tenth';
			dispatch('blur', inputEl);
			proclaim.isTrue(containerClass('invalid'));

			inputEl.value = 10;
			dispatch('input', inputEl);

			proclaim.isFalse(containerClass('invalid'));
			proclaim.isTrue(containerClass('valid'));
		});
	});
});
