import Input from './input';
import State from './state';
import ErrorSummary from './error-summary';

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
			useBrowserValidation: false,
			errorSummary: true
		}, options);

		if (!this.opts.useBrowserValidation) {
			this.form.setAttribute('novalidate', true);
			this.form.addEventListener('submit', this);
		} else {
			this.form.removeAttribute('novalidate');
			let submit = this.form.querySelector('[type=submit]');
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
			let checkedElements = this.validateForm();

			if (checkedElements.some(input => input.valid === false)) {
				if (this.opts.errorSummary) {
					if (this.summary) {
						this.summary = this.form.replaceChild(new ErrorSummary(checkedElements), this.summary);
					} else {
						this.summary = this.form.insertBefore(new ErrorSummary(checkedElements), this.form.firstElementChild);
					}
					this.summary.querySelector('a').focus();
				}

				return;
			}

			e.target.submit();
		}
	}

	/**
	* Form validation
	* Validates every element in the form and creates input objects for the error summary
	*/
	validateForm () {
		return this.formElements.map(element => {
			let valid = element.validate();
			let input = element.input;
			let errorElement = input.parentElement ? input.parentElement.querySelector('.o-forms-input__error') : null;
			let error = errorElement ? errorElement.innerHTML : input.validationMessage;
			let field = input.closest('.o-forms-field');
			let label = field ? field.querySelector('.o-forms-title--main').innerHTML : null;
			return {
				id: input.id,
				valid,
				error: !valid ? error : null,
				label
			};
		});
	}

	/**
	* Input state
	* @param {String} [name] - name of the input fields to add state to
	* @param {String} [state] - type of state to apply — one of 'saving', 'saved', 'none'
	*/
	setState(state, name) {
		let object = this.stateArray.find(item => item.name === name);
		if (!object) {
			object = {
				name,
				element: new State(this.form.elements[name])
			};

			this.stateArray.push(object);
		}

		if (!state) {
			throw new Error(`${state} is not a recognised state, the options are 'saving', 'saved' or 'none'.`);
		}

		object.element.set(state);
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
