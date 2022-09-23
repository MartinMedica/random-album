import {contentUrl, searchUrl, pagepropsUrl, imageUrl} from './constants';

export const searchArticle = async (term) => {
    return await fetch(`${searchUrl}${term}`)  
        .then((res) => res.json())
        .then((data) => data?.query?.search[0]?.title);
}

export const getArticle = async (title) => {
    return await fetch(`${contentUrl}${title}`)
    .then((res) => res.json())
    .then((data)=>{
        let page = data.query.pages;
        let pageId = Object.keys(page)[0];
        return page[pageId].extract;
    });
}

export const getImage = async (title) => {
    return await fetch(`${pagepropsUrl}${title}`)
    .then((res) => res.json())
    .then((data)=>{
        let page = data.query.pages;
        let pageId = Object.keys(page)[0];
        let pageImg = page[pageId].pageprops.page_image;
        if(!pageImg) {
            return;
        }
        return fetch(`${imageUrl}${pageImg}`)
        .then((res) => res.json())
        .then((data)=>{
            let page = data.query.pages;
            let pageId = Object.keys(page)[0];
            let pageImg = page[pageId].imageinfo[0].url;
            return pageImg;
        })
    });
}
