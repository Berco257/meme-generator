'use strict';

function onFacebookShare(ev) {
    ev.preventDefault();
    const imgDataUrl = gData;
    doUploadImg(imgDataUrl, onSuccess);

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.meme-tools>.tool16>a>img').style.opacity = 1;
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;`; 
        window.open(url, '_blank').focus();
    }
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)
    
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            document.querySelector('.meme-tools>.tool16>a>img').style.opacity = 0.3;
            console.error(err)
        })
}