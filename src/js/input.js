class Input {
	/**
	* Class constructor.
	* @param {HTMLElement} [inputContainer] - An input container in the DOM
	*/

	constructor(inputContainer) {
		this.inputContainer = inputContainer;
		this.inputs = Array.from(
			this.inputContainer.querySelectorAll('input', 'textarea', 'select'),
			(input) => {
				input.addEventListener('blur', this);
				input.addEventListener('input', this);
				return input;
			}
		);

		this.className = {
			invalid: 'o-forms-input--invalid',
			valid: 'o-forms-input--valid'
		};
	}

	handleEvent(e) {
		if (e.type === 'blur') {
			this.validate(e.target);
		}

		if (e.type === 'input') {
			if (e.target.validity.valid && this.inputContainer.classList.contains(this.className.invalid)) {
				this.inputContainer.classList.replace(this.className.invalid, this.className.valid);
			}
		}
	}

	validate(input) {
		if (input && !input.validity.valid) {
			this.inputContainer.classList.add(this.className.invalid);
			return false;
		} else if (!input) {
			const validInputs = this.inputs.filter(input => this.validate(input));
			return validInputs.length === this.inputs.length;
		}

		return true;
	}
}

export default Input;