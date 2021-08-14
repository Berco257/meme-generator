'use strict';

let gElCanvas;
let gCtx;

function init() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    addListeners();
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
        lines.forEach((line, idx) => {
            if (idx === getSetSelectedLineIdx) return;
            drawText(line);
        });
        if (getSetSelectedLineIdx() !== -1) {
            renderTools();
            gMeme.img = getElCanvas().toDataURL("image/jpeg");
            getLines().unshift(getLines().splice(getSetSelectedLineIdx(), 1)[0]);
            getSetSelectedLineIdx(0);
            drawText(getSelectedLine());
            drawSelectedLineFrame();
        }
    }
}

function renderMemes() {
    const memes = getMemes();
    const strHtmls = memes.map((meme, idx) => {
        return `
        <div class="saved-meme">
            <img src=${meme.img} onclick="onClickUserMeme(${idx})">
            <div class="remove-saved-meme" onclick="onRemoveSavedMeme(${idx})">❌</div>
        </div>`;
    }).join('');
    document.querySelector('.memes').innerHTML = strHtmls;
}

function renderTools() {
    document.querySelector('.tool1 .txt').value = getSetLineTxt();
    document.querySelector('.tool12 select').value = getSelectedLine().font;
    document.querySelector('.tool13 input').value = getSelectedLine().strokeColor;
    document.querySelector('.tool14 input').value = getSelectedLine().txtColor;
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
    const area = getLineArea(getSelectedLine())
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.rect(area.xPoint, area.yPoint, area.width, area.height)
    gCtx.strokeStyle = 'red';
    gCtx.stroke();
}


function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
        document.querySelector('.main-nav').classList.add('he-font');
        document.querySelector('.main-nav').classList.add('rtl-nav');
    } else {
        document.body.classList.remove('rtl')
        document.querySelector('.main-nav').classList.remove('he-font');
        document.querySelector('.main-nav').classList.remove('rtl-nav');
    }
    doTrans();
    if (document.body.classList.contains('screen-active')) onCloseMenu();
}

function onShowGallery(ev) {
    ev.preventDefault();
    document.querySelector('.gallery').style.display = 'grid';
    document.querySelector('.memes').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.create-meme').style.display = 'none';
    if (document.body.classList.contains('screen-active')) onCloseMenu();
}

function onShowMemes(ev) {
    ev.preventDefault();
    renderMemes();
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.memes').style.display = 'grid';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.create-meme').style.display = 'none';
    if (document.body.classList.contains('screen-active')) onCloseMenu();
}

function onShowAbout(ev) {
    ev.preventDefault();
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.memes').style.display = 'none';
    document.querySelector('.about').style.display = 'block';
    document.querySelector('.create-meme').style.display = 'none';
    if (document.body.classList.contains('screen-active')) onCloseMenu();
}

function onSetMemeImg(imgId) {
    getSetSelectedImgId(imgId);
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.memes').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.create-meme').style.display = 'flex';
    resizeCanvas();
    if (!getLines().length) addNewLine();
    renderCanvas();
}

function onClickUserMeme(memeIdx) {
    setMeme(memeIdx);
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.memes').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.create-meme').style.display = 'flex';
    resizeCanvas();
    renderCanvas();
}

function onRemoveSavedMeme(idx) {
    removeMeme(idx);
    renderMemes();
}

function onOpenMenu() {
    const elMainNav = document.querySelector('.main-nav');
    if(elMainNav.classList.contains('rtl-nav')){
        elMainNav.style.right = 'unset';
        elMainNav.style.left = '0';
    }
    else {
        elMainNav.style.right = '0';
        elMainNav.style.left = 'unset';
    }
    
    const elOpenMenuBtn = document.querySelector('.open-menu');
    elOpenMenuBtn.style.opacity = 0;
    const elCloseMenuBtn = document.querySelector('.main-nav>li:first-child>a');
    elCloseMenuBtn.style.transform = "rotate(180deg)";
    toggleScreen();
}

function onCloseMenu() {
    const elMainNav = document.querySelector('.main-nav');
    if(elMainNav.classList.contains('rtl-nav')){
        elMainNav.style.right = 'unset';
        elMainNav.style.left = '-200px';
    }
    else {
        elMainNav.style.right = '-200px';
        elMainNav.style.left = 'unset';
    }
    
    const elOpenMenuBtn = document.querySelector('.open-menu');
    elOpenMenuBtn.style.opacity = 1;
    const elCloseMenuBtn = document.querySelector('.main-nav>li:first-child>a');
    elCloseMenuBtn.style.transform = "rotate(-180deg)";
    toggleScreen();
}

function toggleScreen() {
    document.body.classList.toggle('screen-active');
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
    elLink.href = gMeme.img;
}

function onSaveMeme() {
    saveMeme();
    const elLabel = document.querySelector('.meme-tools>.tool17>label');
    elLabel.style.display = 'unset';
    setTimeout(() => {
        elLabel.style.display = 'none';
    }, 1000);
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