class Forms {

	constructor (FormEl, opts) {
		this.FormEl = FormEl;
		this.opts = opts || { testEvent: "blur" };
		this.validFormEls = [
			HTMLFormElement,
			HTMLInputElement,
			HTMLSelectElement,
			HTMLButtonElement,
			HTMLTextAreaElement
		];

		// o-forms should only be registered against a <form>
		// element. If not, return to prevent errors
		if (!(this.FormEl instanceof HTMLFormElement)) {
			this.destroy();
			return;
		}

		// Add the event listeners
		this.listeners();
	}

	listeners() {
		if (this.opts.testEvent === 'submit') {
			// Safari reports the validity state, but doesn't
			// prevent form submits, so this listens to submits and
			// checks the inputs are valid before submission.
			this.FormEl.addEventListener('submit', this.validateForm.bind(this), false);

			// All other browsers will report each item invalid on
			// submit and prevent a form submission.
			this.findInputs(this.FormEl).map(input => {
				input.addEventListener('invalid', this.invalidInput, false);
			});

			return;
		} else {
			this.findInputs().map((input) => {
				input.addEventListener('blur', this.validateInput.bind(this), false);
			});
		}
	}

	validateForm(event) {
		event.preventDefault();

		const checkedInputs = this.findInputs(this.FormEl).map(input => this.validateInput(input));

		if (checkedInputs.includes(false)) {
			return;
		}

		// Complete the form submission
		event.target.submit();
	}

	invalidInput(event) {
		const input = event.target;
		input.closest('.o-forms').classList.add('o-forms--error');
	}

	validateInput(event) {
		const input = event.target;

		if (input.checkValidity() === false) {
			this.invalidInput(event);
			return false;
		}

		return true;
	}

	findInputs() {
		return Array.from(this.FormEl.querySelectorAll('input, select, textarea, button, form'));
	}

	destroy() {
		this.FormEl.removeEventListener('submit', this.validateForm.bind(this));
		this.findInputs(this.FormEl).map(input => {
			input.removeEventListener('invalid', this.invalidInput);
			input.removeEventListener('blur', this.validateInput.bind(this));
		});

		this.opts = undefined;
		this.validFormEls = undefined;
		this.FormEl = undefined;
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && /\bo-forms\b/.test(rootEl.getAttribute('data-o-component'))) {
			return new Forms(rootEl, opts);
		}
		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-forms"]'), rootEl => new Forms(rootEl, opts));
	}
}

export default Forms;
