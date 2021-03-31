import {all, call, fork, put, take, takeEvery} from 'redux-saga/effects';
import * as api from '../api/youtube-api';
import * as videoActions from '../actions/video';
import {REQUEST} from '../actions';
import {fecthEntity, ignoreErrors} from './index';

export function* fetchMostPopularVideos(amount, loadDescription, nextPageToken) {
    const request = api.buildMostPopularVideosRequest.bind(null, amount, loadDescription, nextPageToken);
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

export function* fetchMostPopularVideosByCategory(categories) {
    const requests = categories.map(category => {
        const wrapper = ignoreErrors(api.buildMostPopularVideosRequest, 12, false, null, category);
        return call(wrapper);
    });
    try {
        const response = yield all(requests);
        yield put(videoActions.mostPopularByCategory.success(response, categories));
    } catch(error) {
        yield put(videoActions.mostPopularByCategory.failure(error));
    }
}
export function* watchMostPopularVideosByCategory() {
    while(true) {
        const {categories} = yield take(videoActions.MOST_POPULAR_BY_CATEGORY[REQUEST]);
        yield fork(fetchMostPopularVideosByCategory, categories);
    }
}