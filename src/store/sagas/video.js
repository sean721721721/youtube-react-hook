import {all, call, fork, put, take, takeEvery} from 'redux-saga/effects';
import * as api from '../api/youtube-api';
import * as videoActions from '../actions/video';
import {REQUEST} from '../actions';
import {fetchEntity, ignoreErrors} from './index';

export function* fetchMostPopularVideos(amount, loadDescription, nextPageToken) {
    // console.log(amount, loadDescription, nextPageToken);
    const request = api.buildMostPopularVideosRequest.bind(null, amount, loadDescription, nextPageToken);
    yield fetchEntity(request, videoActions.mostPopular);
}
export function* watchMostPopularVideos() {
    while (true) {
        const {amount, loadDescription, nextPageToken} = yield take(videoActions.MOST_POPULAR[REQUEST])
        // console.log(videoActions.MOST_POPULAR[REQUEST], amount, loadDescription, nextPageToken);
        yield fork(fetchMostPopularVideos, amount, loadDescription, nextPageToken);
    }
}


export const fetchVideoCategories = () => fetchEntity(api.buildVideoCategoriesRequest, videoActions.categories);
export function* watchVideoCategories() {
    yield takeEvery(videoActions.VIDEO_CATEGORIES[REQUEST], fetchVideoCategories);
    // console.log(videoActions.VIDEO_CATEGORIES[REQUEST]);
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
        // console.log(videoActions.MOST_POPULAR_BY_CATEGORY[REQUEST], categories);
        yield fork(fetchMostPopularVideosByCategory, categories);
    }
}