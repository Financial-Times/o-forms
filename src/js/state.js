class State {
	constructor(inputs) {
		this.inputs = inputs;
		this.parent = null;

		this.verifyInput();

		this.stateEl = null;
		this.className = {
			saving: 'o-forms-input--saving',
			saved: 'o-forms-input--saved'
		};
	}

	setSavingState() {
		this.stateEl = document.createElement('span');
		this.stateEl.classList.add('o-forms-input__state');
		this.parent.classList.add(this.className.saving);
		this.parent.append(this.stateEl);
	}


	setSavedState() {
		this.parent.classList.replace(this.className.saving, this.className.saved);
	}

	removeState() {
		this.parent.classList.remove(this.className.saved);
		this.parent.removeChild(this.stateEl);
	}

	verifyInput() {
		this.parent = this.inputs[0].closest('.o-forms-input');

		if (NodeList.prototype.isPrototypeOf(this.inputs)
				&& this.parent && !this.parent.classList.contains('o-forms-input--radio-box')) {
			throw new Error('State can only be set on radio inputs with a box style (o-forms-input--radio-box).');
		}
	}
}

export default State;