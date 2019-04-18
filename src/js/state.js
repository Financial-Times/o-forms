class State {
	/**
	* Class constructor.
	* @param {RadioNodeList} [inputs] - A NodeList of radio input elements
	*/
	constructor(inputs) {
		this.inputs = inputs;
		this.parent = inputs.length > 1 ? this.inputs[0].closest('.o-forms-input') : null;

		this._verify();

		this.stateEl = null;
		this.className = {
			saving: 'o-forms-input--saving',
			saved: 'o-forms-input--saved'
		};
	}

	/**
	* State setter
	* @param {String} [state] type of state to display
	*/
	set(state) {
		if (state === 'saving') {
			this._saving();
		} else if (state === 'saved') {
			this._saved();
		} else if (state === 'none') {
			this._remove();
		}
	}

	/**
	* Saving state
	* @access private
	*/
	_saving() {
		if (this.stateEl === null) {
			this.stateEl = document.createElement('span');
			this.stateEl.classList.add('o-forms-input__state');
			this.parent.classList.add(this.className.saving);
			this.parent.append(this.stateEl);
		}
	}

	/**
	* Saved state
	* @access private
	*/
	_saved() {
		this.parent.classList.replace(this.className.saving, this.className.saved);
	}

	/**
	* Remove state
	* @access private
	*/
	_remove() {
		this.parent.classList.remove(this.className.saved);
		this.parent.removeChild(this.stateEl);
		this.stateEl = null;
	}

	/**
	* Verify input parent
	* @access private
	*/
	_verify() {
		if (!this.parent || !this.parent.classList.contains('o-forms-input--radio-box')) {
			throw new Error('State can only be set on radio inputs with a box style (o-forms-input--radio-box).');
		} else if (this.parent.classList.contains('.o-forms--input-invalid')) {
			throw new Error('State cannot be set on an invalid input field.');
		}
	}
}

export default State;