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
		this.formInputs = Array.from(this.form.elements, element => new Input(element));

		this.stateElements = [];

		this.opts = Object.assign({
			useBrowserValidation: false
		}, options);

		if (!this.opts.useBrowserValidation) {
			this.form.setAttribute('novalidate', true);
			this.form.addEventListener('submit', this);
		} else {
			this.form.removeAttribute('novalidate');
			this.submits = this.form.querySelectorAll('[type=submit]');
			this.submits.forEach(submit => {
				submit.addEventListener('click', this);
				submit.addEventListener('keydown', this);
			});
		}
	}

	/**
	 * Event Handler
	 * @param {Object} event - The event emitted by element/window interactions
	 */
	handleEvent(e) {
		const RETURN_KEY = 13;
		if (e.type === 'click' || (e.type === 'keydown' && e.key === RETURN_KEY)) {
			if (this.form.checkValidity() === false) {
				this.validateFormInputs();
			}
		}

		if (e.type === 'submit') {
			e.preventDefault();
			if (this.validateFormInputs().includes(false)) {
				return;
			}

			e.target.submit();
		}
	}

	/**
	* Form validation
	* Validates every element in the form (applies styling)
	*/
	validateFormInputs () {
		return this.formInputs.map(input => input.validate());
	}

	/**
	* Input state
	* @param {String} [name] - name of the input fields to add state to
	* @param {String} [state] - type of state to apply — one of 'saving', 'saved', 'none'
	*/
	setState(state, name) {
		let object = this.stateElements.find(item => item.name === name);
		if (!object) {
			object = {
				name,
				element: new State(this.form.elements[name])
			};

			this.stateElements.push(object);
		}
		object.element.set(state);
	}

	/**
	* Destroy form instance
	*/
	destroy() {
		if (!this.opts.useBrowserValidation) {
			this.form.removeEventListener('submit', this);
		} else {
			this.submits.forEach(submit => {
				submit.removeEventListener('click', this);
				submit.removeEventListener('keydown', this);
			});
		}
		this.form = null;
		this.formInputs.forEach(input => input.destroy());
		this.formInputs = null;
		this.stateElements = null;
		this.opts = null;
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
