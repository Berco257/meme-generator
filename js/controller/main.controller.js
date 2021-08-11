'use strict';

let gElCanvas;
let gCtx;

function init() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    renderCanvas();
}

function renderCanvas() {
    gCtx.save();
    gCtx.fillStyle = "green";
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
    loadImg();
    gCtx.restore();
}

function resizeCanvas() {
    // const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = 500; //elContainer.offsetWidth;
    gElCanvas.height = 500; //elContainer.offsetHeight;
}

function loadImg() {
    var img = new Image();
    img.src = `img/meme-imgs-square/${getSelectedImgId()}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}