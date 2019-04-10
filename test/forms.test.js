/* eslint-env mocha, sinon, proclaim */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const Forms = require('./../main');

describe('Forms', () => {
	let dispatch;
	let inputFields;
	let formEl;
	let sandbox;
	let parentClass;
	let requiredTextField;
	let optionalTextField;
	let dateField;

	beforeEach(() => {
		sandbox = document.createElement('div');
		sandbox.innerHTML = fixtures.form;
		document.body.appendChild(sandbox);

		inputFields = document.body.querySelectorAll('input, textarea, select');
		dateField = inputFields[0];
		requiredTextField = inputFields[3];
		optionalTextField = inputFields[4];

		dispatch = (event, element) => element.dispatchEvent(new Event(event));
		parentClass = (element, validity) => element.closest('.o-forms-input').classList.contains(`o-forms-input--${validity}`);
	});

	afterEach(() => {
		document.body.removeChild(sandbox);
		formEl = null;
	});

	context('on `blur` validation', () => {
		beforeEach(() => {
			formEl = document.body.querySelector("[data-o-component='o-forms'");
			new Forms(formEl);
		});

		it('sets the field to invalid if required field is left empty', () => {
			dispatch('blur', requiredTextField);

			proclaim.isTrue(parentClass(requiredTextField, 'invalid'));
		});

		it('sets the field to invalid if a field value has an incorrect format', () => {
			dateField.value = 'tenth';

			dispatch('blur', dateField);
			proclaim.isTrue(parentClass(dateField, 'invalid'));
		});

		it('does not affect a field that is not required or invalid', () => {
			dispatch('blur', optionalTextField);

			proclaim.isFalse(parentClass(optionalTextField, 'invalid'));
			proclaim.isFalse(parentClass(optionalTextField, 'valid'));
		});
	});

	context('on `input` re-validation', () => {
		beforeEach(() => {
			formEl = document.body.querySelector("[data-o-component='o-forms'");
			new Forms(formEl);
		});

		it('if the field is invalid, it updates validity when input is given', () => {
			dispatch('blur', requiredTextField); //will be invalid

			requiredTextField.value = "some text"; //is valid input
			dispatch('input', requiredTextField);

			proclaim.isFalse(parentClass(requiredTextField, 'invalid'));
			proclaim.isTrue(parentClass(requiredTextField, 'valid'));
		});

		it('if the field input is incorrect, it updates validity when correct input is given', () => {
			dateField.value = 'tenth';
			dispatch('blur', dateField);

			dateField.value = 10;
			dispatch('input', dateField);

			proclaim.isFalse(parentClass(dateField, 'invalid'));
			proclaim.isTrue(parentClass(dateField, 'valid'));
		});

		it('does not affect a field that is not required or invalid', () => {
			optionalTextField.value = 'something';
			dispatch('input', optionalTextField);

			proclaim.isFalse(parentClass(optionalTextField, 'invalid'));
			proclaim.isFalse(parentClass(optionalTextField, 'valid'));
		});
	});

	context('on form `submit`', () => {
		let submit;
		let formSpy;

		beforeEach(() => {
			formEl = document.body.querySelector("[data-o-component='o-forms']");
			formSpy = sinon.spy(formEl, 'addEventListener');
			submit = formEl.querySelector('input[type=submit]');
		});

		context('opts.useBrowserValidation = true', () => {
			it('relays form validation to browser on invalid form inputs', () => {
				new Forms(formEl);
				submit.click();

				proclaim.isTrue(formSpy.withArgs('submit').notCalled);
				proclaim.isTrue(parentClass(dateField, 'invalid'));
				proclaim.isTrue(parentClass(requiredTextField, 'invalid'));
			});
		});

		context('opts.useBrowserValidation = false', () => {
			it('manually validates form inputs', () => {
				new Forms(formEl, { useBrowserValidation: false });

				submit.click();

				proclaim.isTrue(formSpy.withArgs('submit').calledOnce);
				proclaim.isTrue(parentClass(dateField, 'invalid'));
				proclaim.isTrue(parentClass(requiredTextField, 'invalid'));
			});
		});
	});
});
