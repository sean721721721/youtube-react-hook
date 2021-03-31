import {call, fork, take} from 'redux-saga/effects';
import * as api from '../api/youtube-api';
import * as videoActions from '../actions/video';
import {REQUEST} from '../actions';
import {fecthEntity} from './index';

export function* watchMostPopularVideos() {
    while (true) {
        const {amount, loadDescription, nextPageToken} = yield take(videoActions.MOST_POPULAR[REQUEST])
        yield fork(fetchMostPopularVideos, amount, loadDescription, nextPageToken);
    }
}

export function* fetchMostPopularVideos(amount, loadDescription, nextPageToken) {
    const request = api.buildMostPopularVideosRequest.bind(null, amount, loadDescription, nextPageToken);
    yield fecthEntity(request, videoActions.mostPopular);
}