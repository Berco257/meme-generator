'use strict';
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
let gIsUserDrag = false;

function onDown(ev) {
    const pos = getEvPos(ev);
    toggleDrag(true);
}

function onMove(ev) {
    const pos = getEvPos(ev);
    if (isOnObject(pos)) getElCanvas().style.cursor = 'grab';
    else getElCanvas().style.cursor = 'auto';
}

function onUp() {
    toggleDrag(false);
}

function isOnObject(pos) {
    return getLines().find(line => {
        const area = getLineArea(line);
        return ((pos.x >= area.xPoint && pos.x <= area.xPoint + area.width) &&
            (pos.y >= area.yPoint && pos.y <= area.yPoint + area.height))
    });
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

function toggleDrag(toggle) {
    gIsUserDrag = toggle;
}

function isUserDrag() {
    return gIsUserDrag;
}