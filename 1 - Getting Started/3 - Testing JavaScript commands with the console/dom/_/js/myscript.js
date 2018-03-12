console.profile();


	console.group("Page Links"); // groups console commands
	console.log(document.querySelectorAll('a'));
	console.groupEnd();

	console.groupCollapsed("Paragraphs");
	console.dir(document.querySelectorAll('p'));
	console.groupEnd();	

	console.groupCollapsed("Div");
	console.dir(document.getElementById('main'));
	console.groupEnd();

	console.groupCollapsed("Loop");
		console.time("BigLoop")
			for (var i = 1000000; i >= 0; i--) {
			};
		console.timeEnd("BigLoop")	
	console.groupEnd();


console.profileEnd();
