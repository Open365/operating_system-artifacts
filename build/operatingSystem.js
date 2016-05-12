(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.operatingSystem = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DefaultBrowser = require('./defaultBrowser'), ChromeBrowser = require('./chromeBrowser');
function BrowserFactory() {
}
BrowserFactory.getBrowser = function () {
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
        return new ChromeBrowser();
    }
    return new DefaultBrowser();
};
module.exports = BrowserFactory;
},{"./chromeBrowser":2,"./defaultBrowser":3}],2:[function(require,module,exports){
function ChromeBrowser() {
    this._name = 'chrome';
}
ChromeBrowser.prototype.getName = function () {
    return this._name;
};
ChromeBrowser.prototype.isExtensionInstalled = function () {
    return $('#eyeos-extension-is-installed').length > 0;
};
module.exports = ChromeBrowser;
},{}],3:[function(require,module,exports){
function DefaultBrowser() {
    this._name = 'default';
}
DefaultBrowser.prototype.getName = function () {
    return this._name;
};
DefaultBrowser.prototype.isExtensionInstalled = function () {
    return false;
};
module.exports = DefaultBrowser;
},{}],4:[function(require,module,exports){
var BrowserFactory = require('./browserFactory');
var windows = 'Windows';
var macosx = 'MacOs';
var unix = 'Unix';
var linux = 'Linux';
var osname = null;
var eyeRunOs = null;
function isOs(os) {
    return navigator.appVersion.indexOf(os) != -1;
}
if (isOs('Win')) {
    osname = windows;
    eyeRunOs = 'windows';
} else if (isOs('Mac')) {
    osname = macosx;
    eyeRunOs = 'darwin';
} else if (isOs('Linux') || isOs('X11')) {
    osname = 'Linux';
    eyeRunOs = 'linux';
} else {
    osname = 'UNKNOWN';
    eyeRunOs = 'UNKNOWN';
}
var browser = BrowserFactory.getBrowser();
var test = 'removeMe';
var OperatingSystem = {
        WINDOWS: windows,
        MACOSX: macosx,
        UNIX: unix,
        Linux: linux,
        getName: function () {
            return osname;
        },
        getBrowser: function () {
            return browser;
        },
        getEyeRunDownloadLink: function (cb, extension) {
            var url = '/eyerun/latest-' + eyeRunOs;
            if (extension) {
                url = url + '-' + extension;
            }
            $.get(url, function (response) {
                var data = JSON.parse(response);
                cb(data.installurl);
            });
        }
    };
module.exports = OperatingSystem;
},{"./browserFactory":1}]},{},[4])(4)
});