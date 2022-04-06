import {contentUrl, searchUrl} from './constants';
import jsonp from 'jsonp';

export const searchArticle = (term,  callback) => {
    return jsonp(`${searchUrl}${term}`,  undefined, callback);
}

export const getArticle = (title,  callback) => {
    return jsonp(`${contentUrl}${title}`,  undefined, callback);
}
