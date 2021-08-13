'use strict'

function addListeners() {
    addMouseListeners();
    addTouchListeners();
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    const elCanvas = getElCanvas();
    elCanvas.addEventListener('mousedown', onDown)
    elCanvas.addEventListener('mousemove', onMove)
    elCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    const elCanvas = getElCanvas();
    elCanvas.addEventListener('touchstart', onDown)
    elCanvas.addEventListener('touchmove', onMove)
    elCanvas.addEventListener('touchend', onUp)
}