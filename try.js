/*
 * try.js v0.1
 * Copyright (c) 2018 Onur Kerimov
 * http://github.com/onurkerimov
 * Licensed under the MIT license
 */

(function() {

    function $try(callback) {
        var obj = {}
        try { callback() } catch (err) { obj.error = err }
        obj.__proto__ = $try.prototype
        return obj
    }

    $try.prototype.catch = function(callback) {
        if (this.error) { callback(this.error) }
        return this
    }

    $try.prototype.success = function(callback) {
        if (!this.error) { callback() }
        return this
    }

    if($) {
        $.try = $try
    } else {
        window.$try = $try
    }

}());