import Forms from '../../';

let formEl = document.querySelector('form');
let form = new Forms(formEl);

let inputs = form.form.elements['box'];
form.addState(['box', 'box2']);

for (let input of inputs) {
	input.addEventListener('click', () => {
		form.setState('box', 'saving');
		setTimeout(() => form.setState('box', 'saved'), 1000);
		setTimeout(() => form.setState('box', 'none'), 2000);
	});
}

let inputs2 = form.form.elements['box2'];

for (let input of inputs2) {
	input.addEventListener('click', () => {
		form.setState('box2', 'saving');
		setTimeout(() => form.setState('box2', 'saved'), 1000);
		setTimeout(() => form.setState('box2', 'none'), 2000);
	});
}