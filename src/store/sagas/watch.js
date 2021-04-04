import {fork, take, all, put, call} from 'redux-saga/effects';
import * as watchActions from '../actions/watch';
import {REQUEST} from '../actions';
import {buildVideoDetailRequest, buildRelatedVideosRequest, buildChannelRequest} from '../api/youtube-api';
import {SEARCH_LIST_RESPONSE, VIDEO_LIST_RESPONSE} from '../api/youtube-response-types';

export function* fetchWatchDetails(videoId, channelId) {
    console.log(`fetchWatchDetails:  ${videoId} ${channelId}`);
    let requests = [
        buildVideoDetailRequest.bind(null, videoId),
        buildRelatedVideosRequest.bind(null, videoId),
    ]; 

    if (channelId) {
        console.log('buildChannelRequest');
        requests.push(buildChannelRequest.bind(null, channelId));
    }

    try {
        const responses = yield all(requests.map(fn => call(fn)));
        yield put(watchActions.details.success(responses));
        yield call(fetchVideoDetails, responses, channelId === null);
    } catch (error) {
        yield put(watchActions.details.failure(error));
    }
}


export function* watchWatchDetails() {
    while(true) {
        const {videoId, channelId} = yield take(watchActions.WATCH_DETAILS[REQUEST]);
        console.log(videoId, channelId)
        yield fork(fetchWatchDetails, videoId, channelId);
    }
}

function* fetchVideoDetails(responses, shouldFetchChannelInfo) {
    console.log('fetchVideoDetails', shouldFetchChannelInfo);
    const searchListResponse = responses.find(response => response.result.kind === SEARCH_LIST_RESPONSE);
    const relatedVideoIds = searchListResponse.result.items.map(relatedVideo => relatedVideo.id.videoId);

    const requests = relatedVideoIds.map(relatedVideoId => {
        return buildVideoDetailRequest.bind(null, relatedVideoId);
    });

    if (shouldFetchChannelInfo) {
        // if user directly accesses .../watch?v=1234
        // we only know the video id
        // so we have to extract channel id from video detail response
        const videoDetailResponse = responses.find(response => response.result.kind === VIDEO_LIST_RESPONSE);
        const videos = videoDetailResponse.result.items;
        if (videos && videos.length) {
            console.log(videos[0].snippet.channelId);
            requests.push(buildChannelRequest.bind(null, videos[0].snippet.channelId));
        }
    }

    try {
        const responses = yield all(requests.map(fn => call(fn)));
        yield put(watchActions.videoDetails.success(responses));
    } catch(error) {
        yield put(watchActions.videoDetails.failure(error));
    }
}