'use strict';

let gElCanvas;
let gCtx;

function init() {
    renderGallery();
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
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
    // gCtx.save();
    var img = new Image();
    img.src = `img/meme-imgs-square/${getSelectedImgId()}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        const lines = getLines();
        lines.forEach(line => {
            drawText(line.txt, line.size, line.align, line.color, line.pos);
        });
    }
    // gCtx.restore();
}

function resizeCanvas() {
    gElCanvas.width = 500;
    gElCanvas.height = 500;
}

function drawText(txt, size, align, color, pos) {
    gCtx.font = `${size}px Impact`;
    // gCtx.textAlign = "center";
    gCtx.fillStyle = color;
    gCtx.fillText(txt, pos.x, pos.y);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black'
    gCtx.strokeText(txt, pos.x, pos.y)
}

function onSetMemeImg(imgId) {
    setMemeImg(imgId);
    document.querySelector('.gallery').style.display = 'none';
    renderCanvas();
    document.querySelector('.create-meme').style.display = 'flex';
}

function onSetLineTxt() {
    const txt = document.querySelector('.meme-txt .txt').value;
    setLineTxt(1, txt);
    renderCanvas();
}

function onShowGallery(ev) {
    ev.preventDefault();
    document.querySelector('.gallery').style.display = 'grid';
    document.querySelector('.create-meme').style.display = 'none';
}