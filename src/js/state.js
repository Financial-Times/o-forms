class State {
	constructor(input) {
		this.input = input;

		this.verifyInput();

		this.stateEl = null;
		this.className = {
			saving: 'o-forms-input--saving',
			saved: 'o-forms-input--saved'
		};
	}

	setSavingState() {
		if (this.stateEl === null) {
			this.stateEl = document.createElement('span');
			this.stateEl.classList.add('o-forms-input__state');
			this.input.classList.add(this.className.saving);
			this.input.append(this.stateEl);
		}
	}

	setSavedState() {
		this.input.classList.replace(this.className.saving, this.className.saved);
	}

	removeState() {
		this.input.classList.remove(this.className.saved);
		this.input.removeChild(this.stateEl);
		this.stateEl = null;
	}

	verifyInput() {		
		if (!this.input.classList.contains('o-forms-input--radio-box')) {
			throw new Error('State can only be set on radio inputs with a box style (o-forms-input--radio-box).');
		} else if (this.input.classList.contains('.o-forms--input-invalid')) {
			throw new Error('State cannot be set on an invalid input field.')
		}
	}
}

export default State;