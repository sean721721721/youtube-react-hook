import {createAction, createRequestTypes, REQUEST, SUCCESS, FAILURE} from './index';

export const COMMENT_THREAD = createRequestTypes('COMMENT_THREAD');
export const thread = {
    requset: (videoId, nextPageToken) => createAction(COMMENT_THREAD[REQUEST], {videoId, nextPageToken}),
    success: (response, videoId) => createAction(COMMENT_THREAD[SUCCESS], {response, videoId}),
    failure: (response) => createAction(COMMENT_THREAD[FAILURE], {response}),
};