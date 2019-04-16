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
		this.formElements = Array.from(this.form.elements, element => new Input(element));

		this.opts = Object.assign({
			useBrowserValidation: false
		}, options);

		if (!this.opts.useBrowserValidation) {
			this.form.setAttribute('novalidate', true);
			this.form.addEventListener('submit', this);
		} else {
			this.form.removeAttribute('novalidate');
			let submit = this.form.querySelector('input[type=submit]');
			submit.addEventListener('click', this);
			submit.addEventListener('keydown', this);
		}
	}

	/**
	 * Event Handler
	 * @param {Object} event - The event emitted by element/window interactions
	 */
	handleEvent(e) {
		const RETURN_KEY = 13;
		if (e.type === 'click' || (e.type === 'keydown' && e.key === RETURN_KEY)) {
			if (!this.form.reportValidity()) {
				this.validateInputs();
			}
		}

		if (e.type === 'submit') {
			e.preventDefault();
			if (this.validateInputs().includes(false)) {
				return;
			}

			e.target.submit();
		}
	}

	/**
	* Input validation — Will validate each input field in a form
	*/
	validateInputs() {
		return this.formElements.map(input => input.validate());
	}

	setState(name) {
		console.log(this.form.elements[name]);
		console.log(this.formElements[name]);
		// this.formElements.find(item => console.log(item.container.classList.contains('.o-forms-input--radio-box')))
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
