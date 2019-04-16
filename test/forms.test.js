/* eslint-env mocha, sinon, proclaim */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const Forms = require('./../main');

describe('Forms', () => {
	let inputFields;
	let formEl;
	let sandbox;
	let parentClass;
	let requiredTextField;
	let dateField;

	beforeEach(() => {
		sandbox = document.createElement('div');
		sandbox.innerHTML = fixtures.form;
		document.body.appendChild(sandbox);

		inputFields = document.body.querySelectorAll('input, textarea, select');
		dateField = inputFields[0];
		requiredTextField = inputFields[3];

		parentClass = (element, validity) => element.closest('.o-forms-input').classList.contains(`o-forms-input--${validity}`);
	});

	afterEach(() => {
		document.body.removeChild(sandbox);
		formEl = null;
	});

	context('on `submit`', () => {
		let submit;
		let formSpy;

		beforeEach(() => {
			formEl = document.body.querySelector("[data-o-component='o-forms']");
			formSpy = sinon.spy(formEl, 'addEventListener');
			submit = formEl.querySelector('input[type=submit]');
		});

		it('`opts.useBrowserValidation = true` relays form validation to browser on all invalid form inputs', () => {
			new Forms(formEl, { useBrowserValidation: true });

			submit.click();

			proclaim.isTrue(formSpy.withArgs('submit').notCalled);
			proclaim.isTrue(parentClass(dateField, 'invalid'));
			proclaim.isTrue(parentClass(requiredTextField, 'invalid'));
		});

		it('`opts.useBrowserValidation = false manually validates form inputs', () => {
			new Forms(formEl);

			submit.click();

			proclaim.isTrue(formSpy.withArgs('submit').calledOnce);
			proclaim.isTrue(parentClass(dateField, 'invalid'));
			proclaim.isTrue(parentClass(requiredTextField, 'invalid'));
		});
	});
});
