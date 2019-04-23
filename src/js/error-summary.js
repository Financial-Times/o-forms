class ErrorSummary {
	constructor(elements) {
		this.elements = elements;
		this.invalidInputs = [];

		return this.createSummary();
	}

	createSummary() {
		this.elements.forEach(element => {
			if (element.valid) {
				return;
			}
			this.invalidInputs.push(element);
		})

		let list = document.createElement('ul');
		list.classList.add('o-forms__error-summary');
		list.innerHTML = 'There is a problem';
		this.invalidInputs.forEach(input => {
			if (input.id && !input.valid) {
				let listItem = document.createElement('li')
				let anchor = this.createAnchor(input);
				listItem.appendChild(anchor);
				list.appendChild(listItem);
			}
		})

		return list;
	}

	createAnchor(input) {
		let anchor = document.createElement('a')
		anchor.setAttribute('href', `#${input.id}`);
		anchor.innerHTML = `${this.getLabel(input)}: ${input.error}`;
		anchor.addEventListener('click', (e) => {
			e.preventDefault();
			document.querySelector(e.target.hash).focus()
		});
		return anchor;
	}

	getLabel(input) {
		return input.element.parent.previousElementSibling.firstElementChild.innerHTML;
	}
}

export default ErrorSummary;