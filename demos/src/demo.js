import '../../main.js';

document.addEventListener("DOMContentLoaded", function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});

let invalidField = document.querySelector('.o-forms-input--invalid');

if (invalidField) {
	let invalidTextInput = invalidField.querySelector("input[type=text]");
	if (invalidTextInput) {
		invalidTextInput.setAttribute('required', true);
	}

	let invalidTextArea = invalidField.querySelector("textarea");
	if (invalidTextArea) {
		invalidTextArea.setAttribute('required', true);
	}

	let invalidSelect = invalidField.querySelector("select");
	if (invalidSelect) {
		invalidSelect.setAttribute('required', true);
		invalidSelect[0].setAttribute('disabled', true);
		invalidSelect[0].setAttribute('selected', true);
	}
}