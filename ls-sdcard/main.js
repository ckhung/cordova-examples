// http://newtoypia.blogspot.tw/2015/09/cordova-file-plugin.html

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
    var msg = "/sdcard 內含以下總共 " + len + " 個目錄或檔案<br />\n";
    for(var i=0; i<len; ++i) {
	msg += listing[i].fullPath + "<br />\n";
    }
    document.querySelector('#display').innerHTML = msg;
}

function readDir(fileSystem) {
    console.log("ls-sdcard: readDir");
    // var dirReader = fileSystem.root.createReader();
    window.resolveLocalFileSystemURL("file:///sdcard/", function(dir) {
	console.log("ls-sdcard: resolveLocalFileSystemURL processing dir = " + JSON.stringify(dir,null,4).replace(/\n/g, "\n[Console LOG]"));
	dir.createReader().readEntries(printListing);
    });
}

function init() {
    if (! (_ready.device && _ready.dom)) return;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, readDir);
}

