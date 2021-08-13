'use strict';

// let gKeywords = { 'happy': 12, 'funny puk': 1 };

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: -1,
    lines: [],
};

function addNewLine(txt) {
    let newLine = {
        txt: 'I love memes!',
        size: 42,
        font: 'impact',
        align: 'center',
        txtColor: '#ffffff',
        strokeColor: '#000000',
        pos: { x: getElCanvas().width / 2, y: 31 },
    };
    if (gMeme.lines.length === 1) newLine.pos.y = getElCanvas().height - 31;
    else if (gMeme.lines.length > 1) newLine.pos.y = getElCanvas().height / 2;
    gMeme.lines.push(newLine);
    getSetSelectedLineIdx(gMeme.lines.length - 1);
}

function IncDecTxt(dif) {
    if (getSetSelectedLineIdx() === -1) return;
    gMeme.lines[getSetSelectedLineIdx()].size += (2 * dif);
}

function moveLineUpDown(dif) {
    if (getSetSelectedLineIdx() === -1) return;
    getSelectedLine().pos.y += (5 * dif);
}

function selectNextLine() {
    const lastLineIdx = gMeme.lines.length - 1;
    if (lastLineIdx === -1) return false;
    getSetSelectedLineIdx() === lastLineIdx ? getSetSelectedLineIdx(0) : getSetSelectedLineIdx(getSetSelectedLineIdx() + 1);
    return true;
}

function removeLine() {
    if (getSetSelectedLineIdx() === -1) return;
    gMeme.lines.splice(getSetSelectedLineIdx(), 1);
    getSetSelectedLineIdx(-1);
}

function setLinePos(difPos) {
    getSelectedLine().pos.x += difPos.difX;
    getSelectedLine().pos.y += difPos.difY;
}

function setLineAlign(align) {
    if (getSetSelectedLineIdx() === -1) return;
    switch (align) {
        case 'left':
            getSelectedLine().pos.x = 15;
            break;
        case 'center':
            getSelectedLine().pos.x = getElCanvas().width / 2;
            break;
        case 'right':
            getSelectedLine().pos.x = getElCanvas().width - 15;
            break;
    }
    getSelectedLine().align = align;
}

function setLineStrokeColor(color) {
    if (getSetSelectedLineIdx() === -1) return;
    getSelectedLine().strokeColor = color;
}

function setLineTxtColor(color) {
    if (getSetSelectedLineIdx() === -1) return;
    getSelectedLine().txtColor = color;
}

function setLineFont(font) {
    if (getSetSelectedLineIdx() === -1) return;
    getSelectedLine().font = font;
}

function getSetLineTxt(txt) {
    if (getSetSelectedLineIdx() === -1) return;
    if (txt === undefined) return getSelectedLine().txt;
    getSelectedLine().txt = txt;
}

function getSetSelectedImgId(imgId) {
    if (imgId === undefined) return gMeme.selectedImgId;
    gMeme.selectedImgId = imgId;
}

function getSetSelectedLineIdx(idx) {
    if (idx === undefined) return gMeme.selectedLineIdx;
    if (idx === -1) disableEnableTxtInput(true);
    else disableEnableTxtInput(false);
    gMeme.selectedLineIdx = idx;
}

function getLines() {
    return gMeme.lines;
}

function getSelectedLine() {
    return gMeme.lines[getSetSelectedLineIdx()];
}