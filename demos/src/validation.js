import Forms from '../../';

let formEl = document.querySelector('form');
let form = new Forms(formEl);

form.setState('saving', 'box');
setTimeout(form.setState('saved', 'box'), 1000)