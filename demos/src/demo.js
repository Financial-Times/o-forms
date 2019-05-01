require('../../main.js');

document.addEventListener("DOMContentLoaded", function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});

let invalidField = document.querySelector('.o-forms-input--invalid');

if (invalidField) {
	let invalidControls = invalidField.querySelectorAll(".o-forms-input--checkbox input[type='checkbox']");
	if (invalidControls) {
		invalidControls.forEach(conrol => conrol.setAttribute('required', true));
	}
}