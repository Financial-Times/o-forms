import Forms from '../../src/js/forms.js';

let formEl = document.querySelector('form');
const form = new Forms(formEl);

let inputContainer = document.querySelector('.o-forms-input.o-forms-input--radio-box');
let inputs = inputContainer.querySelectorAll('input');

for (let input of inputs) {
	input.addEventListener('click', (e) => {
		let name = e.target.name;
		form.setState(name, 'saving');
		setTimeout(() => form.setState(name, 'saved'), 400);
		setTimeout(() => form.setState(name, 'none'), 1000);
	});
}