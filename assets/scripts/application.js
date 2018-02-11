
function ready(){

}
document.addEventListener("DOMContentLoaded", ready);

var svgDoc, fs_items;

var fs_elements = [];

window.onload = function() {

	svgDoc 						= document.getElementById("fs-svg").contentDocument;
	fs_items					=	[
										"fs-a4-graph", 
										"fs-text-code",
										"fs-tablet-chart", 
										"fs-page-3-right", 
										"fs-mobile-phone", 
										"fs-magnifier", 
										"fs-page-2-center", 
										"fs-key", 
										"fs-screwdriver", 
										"fs-wordpress-monitor", 
										"fs-bulb", 
										"fs-stopwatch", 
										"fs-penсil", 
										"fs-notebook-graph", 
										"fs-gear-orange", 
										"fs-gear-blue", 
										"fs-gear-red", 
										'fs-speedo', 
										"fs-page-1-left", 
									];

	for (let i = 0, len = fs_items.length; i < len; i++) {

		if( svgDoc.getElementById( fs_items[i] ) != null ){

			;
			fs_elements.push(  svgDoc.getElementById( fs_items[i] )  );

		}

	}  


	initialization_svg(  fs_elements  );

	document.getElementById("fs-svg").style.opacity = 1;

	animation_svg(  fs_elements  );

	createPathSVG();

};

if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	})();
}

function animate({duration, timing, draw}) {

	let start = performance.now();

	requestAnimationFrame(function animate_frame(time) {

		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		let progress = timing(timeFraction)

		draw(progress);

		if (timeFraction < 1) {

			requestAnimationFrame(animate_frame);

		}

	});
}

function animation_svg(  fs_elements  ){

	for ( let j = 0,  lenh = fs_elements.length; j < lenh; j++) {

		if( fs_elements[j] !== undefined ){

			setTimeout(
				animate, 
				150*j,
				{

									duration: 2000,

									timing: bounceEaseOut,				

									// timing: function(timeFraction) {
									// 	return  Math.pow(timeFraction, 1.5);
									// },

									draw: function(progress) {
										
										fs_elements[j].style.opacity = progress;

										// matrix(  scaleX(), skewY(), skewX() ,scaleY() ,translateX() ,translateY()  )

										fs_elements[j].style.transform  = "matrix("+ progress +","+ (0.5-progress/2) +","+ (0.2-progress/5) +", "+progress +","+ (250- 250*progress) +","+ (-100 + 100*progress) +")";
									}
				});
		}
	}
}



function initialization_svg( fs_elements ){


	for (let k = 0, leng = fs_elements.length; k < leng; k++) {

		if(  fs_elements[k] != null ){

			fs_elements[k].style.opacity = 0;
		   //matrix(  scaleX(), skewY(), skewX() ,scaleY() ,translateX() ,translateY()  )
		   fs_elements[k].style.transform  = "matrix(  0, 0, 0, 0, 250, -100  )";
		}

	}

}





function makeEaseOut(timing) {
	return function(timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}

function bounce(timeFraction) {
	for (let a = 0, b = 1; 1; a += b, b /= 2) {
		if (timeFraction >= (7 - 4 * a) / 11) {
			return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
		}
	}
}

let bounceEaseOut = makeEaseOut(bounce);




function createPathSVG(){

	var linesSection	=	document.getElementById('block-line-svg');

	linesSection.style.minHeight =	"300px";
	linesSection.style.width =	"100%";
	linesSection.style.backgroundColor = "Gainsboro";


	var The_line_SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");  

		The_line_SVG.setAttributeNS(null, "id", "the-line");  
		The_line_SVG.setAttributeNS(null, "width", "100%");  
		The_line_SVG.setAttributeNS(null, "height", document.body.clientHeight*3+"px"); 

	var the_line_Path = document.createElementNS("http://www.w3.org/2000/svg", "path"); 

	let d 	=	getLineOfPath();

		the_line_Path.setAttributeNS(null, "id", "the-line-path");  
		the_line_Path.setAttributeNS(null, "d", d);  
		the_line_Path.setAttributeNS(null, "stroke", "black"); 
		the_line_Path.setAttributeNS(null, "stroke-width", 13);  
		the_line_Path.setAttributeNS(null, "opacity", 1);  
		the_line_Path.setAttributeNS(null, "fill", "none");

	linesSection.appendChild(The_line_SVG);

	The_line_SVG.appendChild(the_line_Path);

	var totalLenghtPath	= the_line_Path.getTotalLength();



			// Clear any previous transition
		the_line_Path.style.transition = the_line_Path.style.WebkitTransition =
		  'none';
		// Set up the starting positions
		the_line_Path.style.strokeDasharray = totalLenghtPath + ' ' + totalLenghtPath;
		the_line_Path.style.strokeDashoffset = totalLenghtPath;
		// Trigger a layout so styles are calculated & the browser
		// picks up the starting position before animating
		the_line_Path.getBoundingClientRect();
		// Define our transition
		the_line_Path.style.transition = the_line_Path.style.WebkitTransition =
		  'stroke-dashoffset 20s ease-in-out';
		// Go!
		the_line_Path.style.strokeDashoffset = '0';


}


function getLineOfPath(){

	let w = document.body.clientWidth;
	let tw= Math.round(w/4); 
	let D = "";
	let h = document.body.clientHeight/2;

		D += "M"+ (3*tw) +",0";
		D += "v"+h;
		D += "q 0,50 -50,50";
		D += "h-"+2*tw;
		D += "q -50,0 -50,50";
		D += "v"+h;
		D += "q 0,50 50,50";
		D += "h"+2*tw;
		D += "q 50,0 50,50";
		D += "v"+h;
		D += "q 0,50 -50,50";
		D += "h-"+2*tw;
		D += "q -50,0 -50,50";
		D += "v"+h;
		D += "q 0,50 50,50";
		D += "h"+2*tw;
		D += "q 50,0 50,50";
		D += "v"+h;
		D += "q 0,50 -50,50";
		D += "h-"+2*tw;
		D += "q -50,0 -50,50";
		D += "v"+h;


		// D += " z";
		
		return D;

}