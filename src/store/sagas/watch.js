import {fork, take, all, put, call} from 'redux-saga/effects';
import * as watchActions from '../actions/watch';
import {REQUEST} from '../actions';
import {buildVideoDetailRequest} from '../api/youtube-api';

export function* fetchWatchDetails(videoId) {
    let requests = [
        buildVideoDetailRequest.bind(null, videoId),
    ]; 

    try {
        const response = yield all(requests.map(fn => call(fn)));
        yield put(watchActions.details.success(response));
    } catch (error) {
        yield put(watchActions.details.failure(error));
    }
}


export function* watchWatchDetails() {
    while(true) {
        const {videoId} = yield take(watchActions.WATCH_DETAILS[REQUEST]);
        yield fork(fetchWatchDetails, videoId);
    }
}