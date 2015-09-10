angular.module('settings').factory('storage', function(){

    var listeners = {};

    var storageEvent = function(e) {
        for(var key in listeners) {
            if (key == e.key && typeof(listeners[key]) == 'function') {
                listeners[key](JSON.parse(e.newValue), JSON.parse(e.oldValue));
            }
        }
    };

    if (window.addEventListener) {
        window.addEventListener("storage", storageEvent, false);
    } else {
        window.attachEvent("onstorage", storageEvent);
    }

    return {
        attachListener: function(key, callback){
            listeners[key] = callback;
        },
        detachListener: function(key){
            delete listeners[key];
        },
        isSet: function(key) {
            if(window.localStorage.getItem(key)) {
                return true;
            }
            return false;
        },
        set: function(key, value) {
            window.localStorage.setItem(key, JSON.stringify(value));
        },
        get: function(key, defaultValue) {

            if(window.localStorage.getItem(key)) {
                return JSON.parse(window.localStorage.getItem(key));
            }
            return defaultValue;
        },
        remove: function(key){
            window.localStorage.removeItem(key);
        }
    };
});