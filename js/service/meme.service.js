'use strict';

let gKeywords = { 'happy': 12, 'funny puk': 1 };

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: -1,
    lines: [],
};

function addNewLine() {
    let newLine = {
        txt: 'I love memes!',
        size: 42,
        align: 'center',
        txtColor: 'white',
        strokeColor: 'black',
        pos: { x: getElCanvas().width / 2, y: 52 },
        width: getElCanvas().width - 10,
    };
    if (gMeme.lines.length === 1) {
        newLine.pos.y = getElCanvas().height - 10;
    } else if (gMeme.lines.length > 1) {
        newLine.pos.y = getElCanvas().height / 2;
    }
    gMeme.lines.push(newLine);
    getSetSelectedLineIdx(gMeme.lines.length - 1);
}

function IncDecTxt(dif) {
    if (gMeme.selectedLineIdx === -1) return;
    gMeme.lines[gMeme.selectedLineIdx].size += (2 * dif);
}

function moveLineUpDown(dif) {
    if (gMeme.selectedLineIdx === -1) return;
    gMeme.lines[gMeme.selectedLineIdx].pos.y += (5 * dif);
}

function selectNextLine() {
    const lastLineIdx = gMeme.lines.length - 1;
    gMeme.selectedLineIdx === lastLineIdx ? gMeme.selectedLineIdx = 0 : gMeme.selectedLineIdx++;
}

function removeLine() {
    if (gMeme.selectedLineIdx === -1) return;
    gMeme.lines.splice(getSetSelectedLineIdx(), 1);
    gMeme.selectedLineIdx = -1;
}

function getSetSelectedImgId(imgId) {
    if (imgId === undefined) return gMeme.selectedImgId;
    gMeme.selectedImgId = imgId;
}

function getSetSelectedLineIdx(idx) {
    if (idx === undefined) return gMeme.selectedLineIdx;
    gMeme.selectedLineIdx = idx;
}

function getLines() {
    return gMeme.lines;
}

function getSetLineTxt(txt) {
    if (txt === undefined) return gMeme.lines[gMeme.selectedLineIdx].txt;
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}



