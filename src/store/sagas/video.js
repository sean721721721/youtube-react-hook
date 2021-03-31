import {call, fork, take, takeEvery} from 'redux-saga/effects';
import * as api from '../api/youtube-api';
import * as videoActions from '../actions/video';
import {REQUEST} from '../actions';
import {fecthEntity} from './index';

export function* fetchMostPopularVideos(amount, loadDescription, nextPageToken) {
    console.log('fetch');
    const request = api.buildMostPopularVideosRequest.bind(null, amount, loadDescription, nextPageToken);
    console.log(request);
    yield fecthEntity(request, videoActions.mostPopular);
}
export function* watchMostPopularVideos() {
    while (true) {
        const {amount, loadDescription, nextPageToken} = yield take(videoActions.MOST_POPULAR[REQUEST])
        yield fork(fetchMostPopularVideos, amount, loadDescription, nextPageToken);
    }
}


export const fecthVideoCategories = () => fecthEntity(api.buildVideoCategoriesRequest, videoActions.categories);
export function* watchVideoCategories() {
    yield takeEvery(videoActions.VIDEO_CATEGORIES[REQUEST], fecthVideoCategories);
}