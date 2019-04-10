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
		}, options)
		
		this.class = {
			invalid: 'o-forms-input--invalid',
			valid: 'o-forms-input--valid'
		}

		this.formEl.addEventListener('submit', this)

		this.inputFields.forEach(input => {
			input.addEventListener('blur', this)
			input.addEventListener('input', this)
		})
	}

	/**
	 * Event Handler
	 * @param {Object} event - The event emitted by element/window interactions
	 */
	handleEvent(e) {
		let field = e.target.closest('.o-forms-input');
		if (e.type === 'blur') {
			this.validate(e.target, field);
		}

		if (e.type === 'input') {
			this.updateValidity(e.target, field);
		}

		if (!this.opts.useBrowserValidation && e.type === 'submit') {
			e.preventDefault();
			let validatedInputs = this.inputFields.map(input => this.validate(input, field));
			if (validatedInputs.includes(false)) return;
			
			e.target.submit();
		}
	}

	/**
	 * Input validation
	 * @param {Element} input - The input to validate
	 * @param {Element} field - The parent element to toggle the invalid class on
	 */
	validate(input, field) {
		if (!input.validity.valid) {
			field.classList.add(this.class.invalid);
			return false;
		}

		return true;
	}

	/**
	* Input re-validation
	* @param {Element} input - The input to re-evaluate
	* @param {Element} field - The parent element to toggle the validity classes on
	*/
	updateValidity(input, field) {
		if (input.validity.valid && field.classList.contains(this.class.invalid)) {
			field.classList.replace(this.class.invalid, this.class.valid)
		}
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
