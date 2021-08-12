'use strict';

let gElCanvas;
let gCtx;

function init() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    resizeCanvas();
    addNewLine();
    renderCanvas();
}

function renderGallery() {
    const imgs = getImgs();
    const strHtmls = imgs.map(img => {
        return `<img src=${img.url} onclick="onSetMemeImg(${img.id})">`;
    }).join('');
    document.querySelector('.gallery').innerHTML = strHtmls;
}

function renderCanvas() {
    var img = new Image();
    img.src = `img/meme-imgs-square/${getSetSelectedImgId()}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        const lines = getLines();
        lines.forEach(line => {
            drawText(line);
        });
        if (getSetSelectedLineIdx() !== -1) renderTools();
    }
}

function renderTools() {
    document.querySelector('.tool1 .txt').value = getSetLineTxt();
    document.querySelector('.tool13 input').value = getLine().strokeColor;
}

function resizeCanvas() {
    gElCanvas.width = 540;
    gElCanvas.height = 540;
}

function drawText(line) {
    gCtx.textBaseline = "middle";
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.fillStyle = line.txtColor;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function onSetMemeImg(imgId) {
    getSetSelectedImgId(imgId);
    document.querySelector('.gallery').style.display = 'none';
    renderCanvas();
    document.querySelector('.create-meme').style.display = 'flex';
}

function onSetLineTxt() {
    const txt = document.querySelector('.tool1 .txt').value;
    getSetLineTxt(txt);
    renderCanvas();
}

function onShowGallery(ev) {
    ev.preventDefault();
    document.querySelector('.gallery').style.display = 'grid';
    document.querySelector('.create-meme').style.display = 'none';
}

function onIncDecTxt(dif) {
    IncDecTxt(dif);
    renderCanvas();
}

function onAddLine() {
    addNewLine();
    renderCanvas();
}

function onMoveLineUpDown(dif) {
    moveLineUpDown(dif);
    renderCanvas();
}

function onSelectNextLine() {
    if (!selectNextLine()) return;
    console.log('kkkk');
    const txt = document.querySelector('.tool1 .txt').value = getSetLineTxt();
}

function onRemoveLine() {
    removeLine();
    const txt = document.querySelector('.tool1 .txt').value = '';
    renderCanvas();
}

function onSetLineAlign(align) {
    setLineAlign(align);
    renderCanvas();
}

function onSetLineStrokeColor(el) {
    setLineStrokeColor(el.value);
    renderCanvas();
}

function onSetLineTxtColor(el) {
    setLineTxtColor(el.value);
    renderCanvas();
}

function disableEnableTxtInput(toggle) {
    document.querySelector('.tool1 .txt').disabled = toggle;
}

function getElCanvas() {
    return gElCanvas;
}