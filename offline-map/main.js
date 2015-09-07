// http://bl.ocks.org/cpdean/7a71e687dd5a80f6fd57
// https://stackoverflow.com/questions/10805184/d3-show-data-on-mouseover-of-circle

var width = window.innerWidth-10,
    height = window.innerHeight-10;

var projection = d3.geo.mercator().scale(1).translate([0, 0]);

var path = d3.geo.path()
    .projection(projection);

var zoomListener = d3.behavior.zoom()
    .scaleExtent([0.5, 8])
    .on("zoom", zoomHandler);

function zoomHandler() {
    canvas.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.
event.scale + ")");
}

var canvas = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoomListener)
    .append("g");

// jq -s '{"type":"FeatureCollection","features":map(.features[])}' $(find tiles/ -iname '*.json') > data.json
d3.json("roads.json", function(json) {
//    https://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object
    var b = path.bounds(json),
	s = 0.95 / Math.max((b[1][0] - b[0][0]) / width,
	    (b[1][1] - b[0][1]) / height),
	t = [(width - s * (b[1][0] + b[0][0])) / 2,
	    (height - s * (b[1][1] + b[0][1])) / 2];
    projection.scale(s).translate(t);
    canvas.selectAll("path.road")
        .data(json.features)
    .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "road")
	.append("svg:title")
	.text(function(d) { return d.properties.name; });
    d3.json("landuse.json", function(json) {
	canvas.selectAll("path.landuse")
	    .data(json.features)
	.enter()
	    .append("path")
	    .attr("d", path)
	    .attr("class", "landuse")
	    .append("svg:title")
	    .text(function(d) { return d.properties.name; });
    });
});


