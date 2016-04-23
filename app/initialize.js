document.addEventListener('DOMContentLoaded', () => {
	// do your setup here
	console.log('Initialized app');
});

window.addEventListener('load', () => {
	console.log('------------')
	var elements = document.querySelectorAll("input[type=button]");
	console.log(elements);
	[].forEach.call(elements, function(el) {

		var ij = el.id.split(''); // ["#", "44"]
		var letters = ['a','b','c', 'd', 'e', 'f', 'g', 'h'];
		var i = parseInt(ij[0]);
		var j = parseInt(ij[1]);

		el.addEventListener('click', function(e) {
			console.log([i, j])
		});

		// el.setAttribute('value', el.getAttribute('data-n'));
		// el.setAttribute('value', letters[i] + '' + j);
		el.setAttribute('value', el.id);

	});
});


import * as pieces from "models/pieces";

import {
	Knight
}
from "models/pieces";

console.dir(Knight)

var knight = new Knight();

console.dir(knight)