'use strict';

var gCurrLang = 'en';

var gTrans = {
    'gallery': {
        en: 'Gallery',
        he: 'גלריה',
    },
    'memes': {
        en: 'Memes',
        he: 'מימים',
    },
    'about': {
        en: 'About',
        he: 'אודות',
    },
    'save': {
        en: 'Save',
        he: 'שמור',
    },
    'saved': {
        en: 'Saved!',
        he: 'נשמר!',
    },
};

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(function(el) {
        var txt = getTrans(el.dataset.trans);
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    });
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans['en'];
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}