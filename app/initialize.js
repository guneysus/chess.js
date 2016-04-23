document.addEventListener('DOMContentLoaded', () => {
	// do your setup here
	console.log('Initialized app');
});


import {
	Knight
}
from "./models";

console.dir(Knight)

var knight = new Knight();

console.log(knight.move());