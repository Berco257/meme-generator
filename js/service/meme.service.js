'use strict';

let gKeywords = { 'happy': 12, 'funny puk': 1 };

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            id: 1,
            txt: 'I never eat Falafel',
            size: 40,
            align: 'left',
            color: 'red',
            pos: { x: 40, y: 40 },
        }
    ],
};

function getSelectedImgId() {
    return gMeme.selectedImgId;
}

function getLines() {
    return gMeme.lines;
}

function setLineTxt(lineId, txt) {
    const line = gMeme.lines.find(line => {
        return line.id === lineId;
    });
    line.txt = txt;
}

function setMemeImg(imgId){
    gMeme.selectedImgId = imgId;
}