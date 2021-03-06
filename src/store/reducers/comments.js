import {SUCCESS} from '../actions';
import { COMMENT_THREAD } from '../actions/comment';
import {WATCH_DETAILS} from '../actions/watch';
import {COMMENT_THREAD_LIST_RESPONSE} from '../api/youtube-response-types';

const initialState = {
    byVideo: {},
    byId: {},
};

export default function commentsReducer (state = initialState, action) {
    switch (action.type) {
        case WATCH_DETAILS[SUCCESS]:
            return reduceWatchDetails(action.response, action.videoId, state);
        case COMMENT_THREAD[SUCCESS]:
            return reduceCommentThread(action.response, action.videoId, state);
        default:
            return state;
    }

}

function reduceWatchDetails(responses, videoId, prevState) {
    const commentThreadResponse = responses.find(res => res.result.kind === COMMENT_THREAD_LIST_RESPONSE);
    return reduceCommentThread(commentThreadResponse.result, videoId, prevState);
}

function reduceCommentThread(response, videoId, prevState) {
    if (!response) {
        return prevState;
    }

    const newComments = response.items.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {});

    const prevCommentIds = prevState.byVideo[videoId] ? prevState.byVideo[videoId].ids : [];
    const commentIds = [...prevCommentIds, ...Object.keys(newComments)];

    const byVideoComment = {
        nextPageToken: response.nextPageToken,
        ids: commentIds,
    };
    return {
        ...prevState,
        byId: {
            ...prevState.byId,
            ...newComments,
        },
        byVideo: {
            ...prevState.byVideo,
            [videoId]: byVideoComment,
        }
    };
}

export const getCommentsForVideo = (comments, videoId) => {
    const commentIds = comments.byVideo[videoId] ? comments.byVideo[videoId].ids : [];
    const allComments = comments.byId;
    return commentIds.map(commentId => allComments[commentId]);
}

export const getCommentNextPageToken = (comment) => {
    return comment ? comment.nextPageToken : null;
}