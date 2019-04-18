import Forms from '../../src/js/forms.js';
import State from '../../src/js/state.js';


let formEl = document.querySelector('form');
new Forms(formEl);

let inputContainer = document.querySelector('.o-forms-input.o-forms-input--radio-box');
let state = new State(inputContainer);

let inputs = inputContainer.querySelectorAll('input');

for (let input of inputs) {
	input.addEventListener('click', () => {
		state.setSavingState();
		setTimeout(() => state.setSavedState(), 400);
		setTimeout(() => state.removeState(), 1000);
	});
}