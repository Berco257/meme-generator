'use strict';

function saveToStorage(key, val) {
    var json = JSON.stringify(val);
    localStorage.setItem(key, json);
}

function loadFromStorage(key) {
    var json = localStorage.getItem(key);
    var val = JSON.parse(json);
    return val;
}