import Input from './input';

class Forms {
	/**
	* Class constructor.
	* @param {HTMLElement} [formElement] - The form element in the DOM
	* @param {Object} [options={}] - An options object for configuring the form
	*/
	constructor(formElement, options) {
		if (formElement.nodeName !== 'FORM') {
			throw new Error(`[data-o-component="o-forms"] must be set on a form element. It is currently set on a '${formElement.nodeName.toLowerCase()}'.`);
		}

		this.form = formElement;
		this.formElements = this.form.elements;

		this.opts = Object.assign({
			useBrowserValidation: false
		}, options);

		this.className = {
			invalid: 'o-forms-input--invalid',
			valid: 'o-forms-input--valid'
		};

		if (!this.opts.useBrowserValidation) {
			this.form.setAttribute('novalidate', true);
			this.form.addEventListener('submit', this);
		} else {
			this.form.removeAttribute('novalidate');
			let submit = this.form.querySelector('input[type=submit]');
			submit.addEventListener('click', this);
			submit.addEventListener('keydown', this);
		}

		for (let input of this.formElements) {
			input.addEventListener('blur', this);
			input.addEventListener('input', this);
		}
	}

	/**
	 * Event Handler
	 * @param {Object} event - The event emitted by element/window interactions
	 */
	handleEvent(e) {
		if (e.type === 'blur' || e.type === 'input') {
			this.validate(e.target);
		}

		const RETURN_KEY = 13;
		if (e.type === 'click' || (e.type === 'keydown' && e.key === RETURN_KEY)) {
			if (!this.form.checkValidity()) {
				for (let input of this.formElements) {
					this.validate(input)
				}
			}
		}

		if (e.type === 'submit') {
			e.preventDefault();
			let validatedInputs = [];
			for (let input of this.formElements) {
				validatedInputs.push(this.validate(input));
			}

			if (validatedInputs.includes(false)) {
				return;
			}

			e.target.submit();
		}
	}

	/**
	* Input validation
	* @param {Object} input - the input element to validate
	*/
	validate(input) {
		let parent = input.closest('.o-forms-input');
		if (!parent) {
			return;
		}

		if (!input.validity.valid) {
			parent.classList.add(this.className.invalid);
			return false;
		} else if (input.validity.valid && parent.classList.contains(this.className.invalid)) {
			parent.classList.replace(this.className.invalid, this.className.valid);
		}

		return true;
	}

	setState(state, name) {
		let node = this.formElements[name];
		if (NodeList.prototype.isPrototypeOf(node)) {
			let parent = node[0].closest('.o-forms-input');
			if (parent.classList.contains('o-forms-input--radio-box')) {
				let stateEl = document.createElement('span')
				stateEl.classList.add('o-forms-input__state');
				parent.classList.add(`o-forms-input--${state}`);
				parent.append(stateEl);
			}
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
