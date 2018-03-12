console.assert(
	document.querySelectorAll('nav ol>li').length===2,
	"Sorry, there's only two menu items"
);

// passes element from dom into console using this js file
console.log(document.getElementById("main"))
console.dir(document.querySelector("#main"))
console.info("some message")
console.warn("some message")
console.error("some message")