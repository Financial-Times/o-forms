class State {
	constructor(field) {
		this.field = field;

		this.verify();

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
			this.field.classList.add(this.className.saving);
			this.field.append(this.stateEl);
		}
	}

	setSavedState() {
		this.field.classList.replace(this.className.saving, this.className.saved);
	}

	removeState() {
		this.field.classList.remove(this.className.saved);
		this.field.removeChild(this.stateEl);
		this.stateEl = null;
	}

	verify() {
		if (!this.field.classList.contains('o-forms-input--radio-box')) {
			throw new Error('State can only be set on radio inputs with a box style (o-forms-input--radio-box).');
		} else if (this.field.classList.contains('.o-forms--input-invalid')) {
			throw new Error('State cannot be set on an invalid input field.');
		}
	}
}

export default State;