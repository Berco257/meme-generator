'use strict';

let gKeywords = { 'happy': 12, 'funny puk': 1 };

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
        pos: { x: getElCanvas().width / 2, y: 21 },
    };
    if (gMeme.lines.length === 1) newLine.pos.y = getElCanvas().height - 21;
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
    getLine().pos.y += (5 * dif);
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

function setLineAlign(align) {
    if (getSetSelectedLineIdx() === -1) return;
    switch (align) {
        case 'left':
            getLine().pos.x = 0;
            break;
        case 'center':
            getLine().pos.x = getElCanvas().width / 2;
            break;
        case 'right':
            getLine().pos.x = getElCanvas().width;
            break;
    }
    getLine().align = align;
}

function setLineStrokeColor(color){
    if (getSetSelectedLineIdx() === -1) return;
    getLine().strokeColor = color;
}

function setLineTxtColor(color){
    if (getSetSelectedLineIdx() === -1) return;
    getLine().txtColor = color;
}

function getSetLineTxt(txt) {
    if (getSetSelectedLineIdx() === -1) return;
    if (txt === undefined) return getLine().txt;
    getLine().txt = txt;
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

function getLineWidth() {
    gCtx.font = `${getLine().size}px ${getLine().font}`;
    return gCtx.measureText(getLine().txt).width;
}

function getLines() {
    return gMeme.lines;
}

function getLine() {
    return gMeme.lines[getSetSelectedLineIdx()];
}


