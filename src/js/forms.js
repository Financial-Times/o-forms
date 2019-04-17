import Input from './input';
import State from './state';

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
		this.stateArray = [];

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
			if (!this.form.checkValidity()) {
				this.validateForm();
			}
		}

		if (e.type === 'submit') {
			e.preventDefault();
			if (this.validateForm().includes(false)) {
				return;
			}

			e.target.submit();
		}
	}

	/**
	* Form validation
	* Validates every element in the form
	*/
	validateForm () {
		return this.formElements.map(input => input.validate());
	}

	addState(collection) {
		this.stateArray = collection.map(name => {
			return {
				name,
				element: new State(this.form.elements[name])
			};
		});
	}

	setState(name, state) {
		let object = this.stateArray.find(item => item.name === name);
		if (state === 'saving') {
			object.element.setSavingState();
		} else if (state === 'saved') {
			object.element.setSavedState();
		} else if (state === 'none') {
			object.element.removeState();
		} else {
			throw new Error(`${state} is not a recognised state, the options are 'saving', 'saved' or 'none'.`);
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
