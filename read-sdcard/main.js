// https://codinggrapes.wordpress.com/2012/05/04/read-xml-from-sd-card-in-android-phonegap/
// http://www.raymondcamden.com/2012/03/09/PhoneGaps-File-API
// http://rickluna.com/wp/2014/01/accessing-external-storage-in-android-phonegap-3-3/

// http://www.html5rocks.com/en/tutorials/es6/promises/
// http://complexitymaze.com/2014/03/03/javascript-promises-a-comparison-of-libraries/
// http://12devs.co.uk/articles/promises-an-alternative-way-to-approach-asynchronous-javascript/
// https://coderwall.com/p/yf6mea/using-the-file-api-without-callbacks

var _ready = { device: 0, dom: 0 };
// http://stackoverflow.com/questions/7432815/jquery-wait-for-multiple-complete-events


document.addEventListener("deviceready", function() {
    _ready.device = 1; init();
}, false);

document.addEventListener("DOMContentLoaded", function() {
    _ready.dom = 1; init();
}, false);

function printListing(listing) {
    var len = listing.length;
    var msg = "printListing: " + len + " entries in total<br />\n";
    for(var i=0; i<len; ++i) {
	msg += listing[i].fullPath + "<br />\n";
    }
    document.querySelector('#display').innerHTML = msg;
}

function readDir(fileSystem) {
    console.log("readDir");
    // var dirReader = fileSystem.root.createReader();
    window.resolveLocalFileSystemURL("file:///sdcard/", function(dir) {
	console.log("resolveLocalFileSystemURL anon callback: ");
	console.log(JSON.stringify(dir));
	dir.createReader().readEntries(printListing);
    });
}

function init() {
    if (! (_ready.device && _ready.dom)) return;
    console.log("cordoofy: check point B");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, readDir);
}

