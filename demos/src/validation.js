import Forms from '../../src/js/forms.js';

let formEl = document.querySelector('form');
const form = new Forms(formEl);

let inputContainer = document.querySelector('.o-forms-input.o-forms-input--radio-box');
let state = form.addState(inputContainer);

let inputs = inputContainer.querySelectorAll('input');

for (let input of inputs) {
	input.addEventListener('click', () => {
		state.setSavingState();
		setTimeout(() => state.setSavedState(), 400);
		setTimeout(() => state.removeState(), 1000);
	});
}