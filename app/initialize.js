document.addEventListener('DOMContentLoaded', () => {
	// do your setup here
	console.log('Initialized app');
});

window.addEventListener('load', () => {
	var elements = document.querySelectorAll("input[type=button]");
	[].forEach.call(elements, function(el) {

		var ij = el.id.split(''); // ["#", "c4"]
		var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		var c = ij[0];
		var j = ij[1];
		var i = letters.indexOf(c);

		el.addEventListener('click', function(e) {
			console.log(this.id);
			console.log([i, parseInt(j) - 1])
		});

		el.setAttribute('value', el.id.toUpperCase());

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
