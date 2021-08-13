'use strict';

let gElCanvas;
let gCtx;
let gData;

function init() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    // resizeCanvas();
    // addNewLine();
    addListeners();
    // renderCanvas();
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
        if (getSetSelectedLineIdx() !== -1) {
            renderTools();
            gData = getElCanvas().toDataURL();
            drawSelectedLineFrame();
        }
    }
}

function renderTools() {
    document.querySelector('.tool1 .txt').value = getSetLineTxt();
    document.querySelector('.tool12 select').value = getLine().font;
    document.querySelector('.tool13 input').value = getLine().strokeColor;
    document.querySelector('.tool14 input').value = getLine().txtColor;
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetWidth;
}

function drawText(line) {
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textBaseline = "middle";
    gCtx.textAlign = line.align;
    gCtx.fillStyle = line.txtColor;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function drawSelectedLineFrame() {
    const area = getLineArea(getLine())
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.rect(area.xPoint, area.yPoint, area.width, area.height)
    gCtx.strokeStyle = 'red';
    gCtx.stroke();
}

function onShowGallery(ev) {
    ev.preventDefault();
    document.querySelector('.gallery').style.display = 'grid';
    document.querySelector('.create-meme').style.display = 'none';
}

function onSetMemeImg(imgId) {
    getSetSelectedImgId(imgId);
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.create-meme').style.display = 'flex';
    resizeCanvas();
    addNewLine();
    renderCanvas();
}

function onSetLineTxt() {
    const txt = document.querySelector('.tool1 .txt').value;
    getSetLineTxt(txt);
    renderCanvas();
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
    const txt = document.querySelector('.tool1 .txt').value = getSetLineTxt();
    renderCanvas();
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
function onSetLineFont(el) {
    setLineFont(el.value);
    renderCanvas();
}

function onDownloadImg(elLink) {
    elLink.href = gData;
}

function disableEnableTxtInput(toggle) {
    document.querySelector('.tool1 .txt').disabled = toggle;
}

function getLineArea(line) {
    gCtx.font = `${line.size}px ${line.font}`;
    const width = gCtx.measureText(line.txt).width + 20;
    const height = line.size + 10
    let xPoint;
    let yPoint;

    switch (line.align) {
        case 'left':
            xPoint = line.pos.x - 10;
            yPoint = line.pos.y - (line.size / 2) - 5;
            break;
        case 'center':
            xPoint = line.pos.x - ((width - 20) / 2) - 10;
            yPoint = line.pos.y - (line.size / 2) - 5;
            break;
        case 'right':
            xPoint = line.pos.x - width + 10;
            yPoint = line.pos.y - (line.size / 2) - 5;
            break;
    }
    return { xPoint, yPoint, width, height };
}

function getElCanvas() {
    return gElCanvas;
}