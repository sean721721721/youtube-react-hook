import {WATCHED_VIDEO} from '../actions/history';

const initialState = {
    byVideo: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case WATCHED_VIDEO:
            const video = action.video;
            return {
                byVideo: {
                    ...state.byVideo,
                    ...action.video,
                },
            }
        default:
            return state;
    }
}

export const getWatchedVideos = (state, index) => {
    const videoIds = state.byVideo ? Object.keys(state.byVideo) : [];
    return videoIds.map(videoId => state.byVideo[videoId])
                   .slice(0, index);
}

export const getAmountVideos = (state) => {
    return state.byVideo ? Object.keys(state.byVideo).length : 0;
}