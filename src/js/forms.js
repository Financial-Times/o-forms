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
		this.formEl = formElement;
		this.inputFields = Array.from(formElement.querySelectorAll('input', 'select', 'textarea'));

		this.opts = Object.assign({
			useBrowserValidation: false,
			errorSummary: true
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
	* Validates every element in the form
	*/
	validateForm () {
		return this.formElements.map(element => {
			let valid = element.validate();
			let input = element.input;
			let errorElement = element.parent ? element.parent.querySelector('.o-forms-input__error') : null;
			let error = errorElement ? errorElement.innerHTML : input.validationMessage;
			return {
				id: input.id,
				valid,
				error: !valid ? error : null,
				element
			}
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
