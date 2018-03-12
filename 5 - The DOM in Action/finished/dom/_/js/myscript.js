(function() {

	//Selecting our node (we didnt select img node)
	var myNode = document.querySelector('#artlist .pixgrid ul'), // alt1
		 myOverlay, largeImage; // might be declared as local var 

	//check for click on ul node (img wrapper)
	myNode.addEventListener("click", function(e) {
// this kw refers to myNode object, e refers to event object
		
		if(e.target.tagName === 'IMG') { // alt: e.target.nodeName

			//create overlay and place it on body
			myOverlay = document.createElement('div');
			myOverlay.id = 'overlay';
			document.body.appendChild(myOverlay);

			//set up overlay styles (normally css wud be preferred)
			myOverlay.style.position = 'absolute'; // positioned inside body
			myOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';

			//resize and position overlay
			myOverlay.style.width = window.innerWidth + 'px';
			myOverlay.style.height = window.innerHeight + 'px';
			myOverlay.style.top = window.pageYOffset + 'px';
			myOverlay.style.left = window.pageXOffset + 'px';

			//Create image element and add it on overlay
			var imageSrc = e.target.src; // used to get big version of picture
			largeImage = document.createElement('img');
			largeImage.id = 'largeImage';
			largeImage.src = imageSrc.substr(0, imageSrc.length-7) + '.jpg';
			largeImage.style.cursor = 'pointer';
			largeImage.style.display = 'block'; // to set width and hight
			largeImage.style.position = 'absolute'; // positioned inside myOverlay
// alt1: largeImage.setAttribute("style", "display: block; position: absolute;")
// alt2: largeImage.style = "display: block; position: absolute;"
			
//*wait until the image has loaded so that we adjust new size and centralize it*
			largeImage.addEventListener('load', function() {
// this kw refers to largeImage object
				//Resize if taller
				if (this.height > window.innerHeight) { // img has height and width attr
					this.ratio = window.innerHeight / this.height;
					this.height = this.height * this.ratio;
					this.width = this.width * this.ratio; // to keep aspect ratio
				} // alt2

				//Resize if wider
				if (this.width > window.innerWidth) {
					this.ratio = window.innerWidth / this.width;
					this.height = this.height * this.ratio;
					this.width = this.width * this.ratio;
				}

				centerImage();
				myOverlay.appendChild(largeImage);

			}); //image has loaded

			//close the image by clicking
			largeImage.addEventListener('click', function() { // alt3
				if (myOverlay) { // needless check for 2 reasons
					myOverlay.parentNode.removeChild(myOverlay);//still exists in memory
					window.removeEventListener('resize', resizeFunc, false);
					window.removeEventListener('scroll', scrollFunc, false);
					window.removeEventListener('keydown', escFunc, false);
					this.removeEventListener('keydown', arguments.callee, false)
					// alt: largeImage.removeEventListener('keydown', handler, false)
				}
			}, false);

			// close the image with escape key (my own code):
			window.addEventListener("keydown", escFunc, false); // alt3

			window.addEventListener('scroll', scrollFunc, false);

// triggered when zooming or resizing windows
			window.addEventListener('resize', resizeFunc, false)

		} // target is an image

	}, false); //ul (img wrapper) is clicked
 // with false arg we target things inside ul not outside (default)

	var scrollFunc = function() {
		if (myOverlay) { // needless check
			myOverlay.style.top = window.pageYOffset + 'px';
			myOverlay.style.left = window.pageXOffset + 'px';
		}
	}

	var escFunc = function (e) { // alt3
		if (myOverlay) { // needless check
		    if (e.keyCode == 27) { // escape key maps to keycode `27`
				myOverlay.parentNode.removeChild(myOverlay);
				window.removeEventListener('resize', resizeFunc, false);
				window.removeEventListener('scroll', scrollFunc, false);
				this.removeEventListener('keydown', escFunc, false)//needed
		    }
		}
	}

	var resizeFunc = function() {
		if (myOverlay) { // needless check
			myOverlay.style.width = window.innerWidth + 'px';
			myOverlay.style.height = window.innerHeight + 'px';

			centerImage();
		}
	}

	function centerImage() {
		var myDifX = (window.innerWidth - largeImage.width)/2; // alt2
		var myDifY = (window.innerHeight - largeImage.height)/2;

		largeImage.style.top = myDifY + 'px';
		largeImage.style.left = myDifX + 'px';

		return largeImage; // needless
	}

})(); //self executing function

// *alt1: looping images nodelist*
// var myNode = document.querySelectorAll('#artlist .pixgrid img');

// for(var i=0; i<myNode.length; i++) {

// 	myNode[i].addEventListener("click", function(e) {
// 		...
// 	}, false)
// }


// 	alt2: using css width-height instead of attr width-height on image & using overlay width/height instead of window width/height
//	if (this.height > myOverlay.style.height.substr(0, myOverlay.style.height.length-2)) {
//		this.ratio = myOverlay.style.height.substr(0, myOverlay.style.height.length-2) / this.height;
//		this.style.height = this.height * this.ratio + "px";
//		this.style.width = this.width * this.ratio + "px";
//	}
//	
//	var myDifY = (myOverlay.style.height.substr(0, myOverlay.style.height.length-2) - largeImage.style.height.substr(0, largeImage.style.height.length-2))/2;
//	var myDifX = (myOverlay.style.width.substr(0, myOverlay.style.width.length-2) - largeImage.style.width.substr(0, largeImage.style.width.length-2))/2;


// alt3: merging keydown and click events with same callback (not quite worked)
// largeImage.addEventListener('click', closerFunc, false);

// // close the image with escape key (my own code):
// window.addEventListener("keydown", function(e){
// 	if (e.keyCode == 27) {closerFunc(e)}
// }, false);

// var closerFunc = function (e) {
// 	myOverlay.parentNode.removeChild(myOverlay);
// 	window.removeEventListener('resize', resizeFunc, false);
// 	window.removeEventListener('scroll', scrollFunc, false);
// 	if (e.type === "keydown") {
// 		largeImage.removeEventListener('click', arguments.callee, false)
// 		this.removeEventListener('keydown', arguments.callee, false)
// 	} else if (e.type === "click") {
// 		window.removeEventListener('keydown', closerFunc, false)
// 		this.removeEventListener('click', closerFunc, false)
// 	}
// }
