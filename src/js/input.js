class Input {
	/**
	* Class constructor.
	* @param {HTMLElement} [fieldElement] - An input container in the DOM
	*/

	constructor(element) {
		this.input = element;
		this.parent = element.closest('.o-forms-input');

		this.input.addEventListener('blur', this);
		this.input.addEventListener('input', this);

		this.className = {
			invalid: 'o-forms-input--invalid',
			valid: 'o-forms-input--valid'
		};
	}

	handleEvent(e) {
		if (e.type === 'blur') {
			this.validate();
		}

		if (e.type === 'input') {
			if (this.input.validity.valid && this.parent.classList.contains(this.className.invalid)) {
				this.parent.classList.replace(this.className.invalid, this.className.valid);
			}
		}
	}

	validate() {
		if (!this.input.validity.valid) {
			this.parent.classList.add(this.className.invalid);
			return false;
		}

		return true;
	}

	// setState(state) {
	// 	if (!this.container.classList.contains('.o-forms-input--radio-box')) {
	// 		throw new Error('State can only be set on radio inputs with a box style (o-forms-input--radio-box).');
	// 	}

	// }
}

export default Input;