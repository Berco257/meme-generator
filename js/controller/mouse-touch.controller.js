'use strict';

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
let gIsUserDrag = false;
let gLastEvPos;
let gCurrEvPos;

function onDown(ev) {
    gCurrEvPos = getEvPos(ev);
    const line = getLineBelow();
    if (!line) return;
    setLineDrag(true);
    getSetSelectedLineIdx(getLineIdxBelow());
    renderCanvas();
}

function onMove(ev) {
    gLastEvPos = gCurrEvPos;
    gCurrEvPos = getEvPos(ev);
    const line = getLineBelow();

    if(line) getElCanvas().style.cursor = 'pointer';
    else if(!line && !gIsUserDrag) getElCanvas().style.cursor = 'auto';
    if (!gIsUserDrag) return;
    const difPos = { difX: gCurrEvPos.x - gLastEvPos.x, difY: gCurrEvPos.y - gLastEvPos.y };
    setLinePos(difPos);
    renderCanvas();
}

function onUp() {
    setLineDrag(false);
}

function getLineBelow() {
    return getLines().find(isLineBelow);
}

function getLineIdxBelow() {
    return getLines().findIndex(isLineBelow);
}

function isLineBelow(line){
    const area = getLineArea(line);
    return ((gCurrEvPos.x >= area.xPoint && gCurrEvPos.x <= area.xPoint + area.width) &&
        (gCurrEvPos.y >= area.yPoint && gCurrEvPos.y <= area.yPoint + area.height));
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function setLineDrag(isDrag) {
    gIsUserDrag = isDrag;
}