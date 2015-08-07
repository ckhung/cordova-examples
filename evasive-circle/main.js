var _ready = { device: 0, dom: 0 };
// http://stackoverflow.com/questions/7432815/jquery-wait-for-multiple-complete-events

function isApp() { return(document.URL.indexOf('file:///android_asset')>=0); }
// http://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser

if (isApp()) {
    document.addEventListener("deviceready", function() {
	_ready.device = 1; init();
    }, false);
} else {
    _ready.device = 1;
}

document.addEventListener("DOMContentLoaded", function() {
    _ready.dom = 1; init();
}, false);
// http://stackoverflow.com/questions/9899372/pure-javascript-equivalent-to-jquerys-ready-how-to-call-a-function-when-the

function init() {
    if (! (_ready.device && _ready.dom)) return;
    var canvas = d3.select("#display svg");
    canvas.style("border", "1px solid blue");
//	.attr("width", 400).attr("height",400)
    canvas.append("text").text("閃躲的圓")
	.attr("x", 10).attr("y", 360)
	.attr("font-size", "16px").attr("fill", "blue");
    canvas.append("text").text("an evasive circle")
	.attr("x", 10).attr("y", 380)
	.attr("font-size", "16px").attr("fill", "blue");
    var circle = canvas.append("circle")
	.attr("cx", canvas.attr("width")/2)
	.attr("cy", canvas.attr("height")/2)
	.attr("r", 30).style("fill", "#80c");
    circle.on("mouseover", function(d) {
	circle.transition().
	attr("cx",Math.random()*canvas.attr("width")).
	attr("cy",Math.random()*canvas.attr("height"))
    });
}

