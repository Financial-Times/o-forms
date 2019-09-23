class State {
	/**
	* Class constructor.
	* @param {RadioNodeList} [inputs] - A NodeList of radio input elements
	 * @param {Boolean|Object} opts - an object of options
	 * @param {String} options.iconOnly [null] - when true display an icon only, hiding the status label
	*/
	constructor(inputs, opts) {
		let radioInputs = inputs instanceof RadioNodeList;
		if (radioInputs) {
			this.inputs = inputs;
			this.parent = this.inputs[0].closest('.o-forms-input');
		} else {
			throw new Error('State can only be applied to `radio` type inputs.');
		}

		this._verify();
		this.opts = Object.assign({
			iconOnly: false
		}, opts);

		this.className = {
			saving: 'o-forms-input--loading',
			saved: 'o-forms-input--success'
		};
	}

	/**
	* Create state element
	* @access private
	*/
	_generateStateEl() {
		this.stateEl = document.createElement('span');
		this.stateElLabel = document.createElement('span');
		this.stateEl.appendChild(this.stateElLabel);
		let classNames = this.opts.iconOnly ? ['o-forms-input__state', 'o-forms-input__state--icon-only'] : ['o-forms-input__state'];
		 this.stateEl.classList.add(...classNames);
		this.parent.append(this.stateEl);
	}

	/**
	* State setter
	* @param {String} state type of state to display
	* @param {String} label customise the label of the state, e.g. the saved state defaults to "Saving" but could be "Sent"
	*/
	set(state, label) {
		if (!this.stateEl) {
			this._generateStateEl();
		}

		if (state === 'saving') {
			this._saving(label);
		} else if (state === 'saved') {
			this._saved(label);
		} else if (state === 'none') {
			this._remove();
		} else {
			throw new Error(`${state} is not a recognised state, the options are 'saving', 'saved' or 'none'.`);
		}
	}

	/**
	* Saving state
	* @access private
	*/
	_saving(label) {
		this.stateElLabel.textContent = label || 'Saving';
		this.parent.classList.remove(this.className.saved);
		this.parent.classList.add(this.className.saving);
	}

	/**
	* Saved state
	* @access private
	*/
	_saved(label) {
		this.stateElLabel.textContent = label || 'Saved';
		this.parent.classList.remove(this.className.saving);
		this.parent.classList.add(this.className.saved);
	}

	/**
	* Remove state
	* @access private
	*/
	_remove() {
		this.parent.classList.remove(this.className.saving);
		this.parent.classList.remove(this.className.saved);
		this.parent.removeChild(this.stateEl);
		this.stateEl = null;
	}

	/**
	* Verify input parent
	* @access private
	*/
	_verify() {
		if (!this.parent.classList.contains('o-forms-input--radio-box')) {
			throw new Error('State can only be set on radio inputs with a box style (o-forms-input--radio-box).');
		} else if (this.parent.classList.contains('.o-forms--input-invalid')) {
			throw new Error('State cannot be set on an invalid input field.');
		}
	}
}

export default State;
