var _ready = { device: 0, dom: 0, data: 0 };
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

var _config;
var _colorIndex = 0;

d3.json("config.json", function (data) {
    if (! data) { alert("read failed: config.json"); return; }
    _config = data;
    _ready.data = 1; init();
});

function init() {
    if (! (_ready.device && _ready.dom && _ready.data)) return;
    var canvas = d3.select("#display svg");
    var bg = canvas.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", canvas.attr("width"))
	.attr("height", canvas.attr("height"))
	.style("fill", _config.background);
    var circle = canvas.append("circle")
	.attr("cx", canvas.attr("width")/2)
	.attr("cy", canvas.attr("height")/2)
	.attr("r", 30).style("fill", "#fff");
    circle.on("mouseover", function () {
	circle.transition().style("fill", _config.colors[_colorIndex]);
	_colorIndex = (_colorIndex + 1) % _config.colors.length;
    });
}

