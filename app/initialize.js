document.addEventListener('DOMContentLoaded', () => {
	// do your setup here
	console.log('Initialized app');
});

window.addEventListener('load', () => {


	var elements = document.querySelectorAll("input[type=button]");
	[].forEach.call(elements, function(el) {
		el.addEventListener('click', function(e) {
			console.log(board.getCell(this.id));
		});


	});
});