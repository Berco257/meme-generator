'use strict';

let gKeywords = {
    'president': 0,
    'animal': 0,
    'happy': 0,
    'dog': 0,
    'baby': 0,
    'movie': 0,
    'sport': 0,
    'news': 0,
};

const gImgs = [
    { id: 1, url: 'img/meme-imgs-square/1.jpg', keywords: ['president'] },
    { id: 2, url: 'img/meme-imgs-square/2.jpg', keywords: ['animal', 'dog'] },
    { id: 3, url: 'img/meme-imgs-square/3.jpg', keywords: ['animal', 'dog'] },
    { id: 4, url: 'img/meme-imgs-square/4.jpg', keywords: ['animal'] },
    { id: 5, url: 'img/meme-imgs-square/5.jpg', keywords: ['baby'] },
    { id: 6, url: 'img/meme-imgs-square/6.jpg', keywords: ['movie', 'happy'] },
    { id: 7, url: 'img/meme-imgs-square/7.jpg', keywords: ['baby'] },
    { id: 8, url: 'img/meme-imgs-square/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/meme-imgs-square/9.jpg', keywords: ['baby', 'happy'] },
    { id: 10, url: 'img/meme-imgs-square/10.jpg', keywords: ['president', 'happy'] },
    { id: 11, url: 'img/meme-imgs-square/11.jpg', keywords: ['sport', 'happy'] },
    { id: 12, url: 'img/meme-imgs-square/12.jpg', keywords: ['news'] },
    { id: 13, url: 'img/meme-imgs-square/13.jpg', keywords: ['movie'] },
    { id: 14, url: 'img/meme-imgs-square/14.jpg', keywords: ['movie', 'happy'] },
    { id: 15, url: 'img/meme-imgs-square/15.jpg', keywords: ['movie'] },
    { id: 16, url: 'img/meme-imgs-square/16.jpg', keywords: ['movie'] },
    { id: 17, url: 'img/meme-imgs-square/17.jpg', keywords: ['animal', 'president'] },
    { id: 18, url: 'img/meme-imgs-square/18.jpg', keywords: ['movie'] },
];

//str.includes("worl")
function getImgsForDisplay(strSearch) {
    if (!strSearch) return gImgs;
    let imgs = [];
    gImgs.forEach(img => {
        if (img.keywords.find(word => word.includes(strSearch))) {
            imgs.push(img);
        }
    });
    return imgs;
}