class Forms {
	/**
	* Class constructor.
	* @param {HTMLElement} [formElement] - The form element in the DOM
	* @param {Object} [options={}] - An options object for configuring the form
	*/
	constructor(formElement, options) {
		this.formEl = formElement;
		this.inputFields = Array.from(formElement.querySelectorAll('input', 'select', 'textarea'));

		this.opts = Object.assign({
			useBrowserValidation: true
		}, options);

		this.className = {
			invalid: 'o-forms-input--invalid',
			valid: 'o-forms-input--valid'
		};

		if (!this.opts.useBrowserValidation) {
			this.formEl.setAttribute('novalidate', true);
			this.formEl.addEventListener('submit', this);
		} else {
			this.formEl.removeAttribute('novalidate');
			let submit = this.formEl.querySelector('input[type=submit]');
			submit.addEventListener('click', this);
			submit.addEventListener('keydown', this);
		}

		this.inputFields.forEach(input => {
			input.addEventListener('blur', this);
			input.addEventListener('input', this);
		});
	}

	/**
	 * Event Handler
	 * @param {Object} event - The event emitted by element/window interactions
	 */
	handleEvent(e) {
		let field = e.target.closest('.o-forms-input');
		if (e.type === 'blur') {
			field.querySelectorAll('input').forEach(input => this.validate(input));
		}

		if (e.type === 'input') {
			if (e.target.validity.valid && field.classList.contains(this.className.invalid)) {
				field.classList.replace(this.className.invalid, this.className.valid);
			}
		}

		const RETURN_KEY = 13;
		if (e.type === 'click' || (e.type === 'keydown' && e.key === RETURN_KEY)) {
			if (!this.formEl.reportValidity()) {
				this.inputFields.forEach(input => this.validate(input));
			}
		}

		if (e.type === 'submit') {
			e.preventDefault();
			let validatedInputs = this.inputFields.map(input => this.validate(input));
			if (validatedInputs.includes(false)) {
				return;
			}

			e.target.submit();
		}
	}

	/**
	 * Input validation
	 * @param {Element} input - The input to validate
	 */
	validate(input) {
		if (!input.validity.valid) {
			input.closest('.o-forms-input').classList.add(this.className.invalid);
			return false;
		}

		return true;
	}

	/**
	 * Initialise form component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise a form in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the banners
	 */
	static init(rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}

		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		if (rootEl instanceof HTMLFormElement) {
			return new Forms(rootEl, opts);
		}

		return Array.from(rootEl.querySelectorAll('[data-o-component="o-forms"]'), rootEl => new Forms(rootEl, opts));
	}
}

export default Forms;
