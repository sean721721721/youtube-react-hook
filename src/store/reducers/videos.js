import {MOST_POPULAR} from '../actions/video';
import {SUCCESS} from '../actions';

const initialState = {
    byId: {},
    mostPopular: {},
};

export default function videos(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case MOST_POPULAR[SUCCESS]:
            return reduceFetchMostPopularVideos(action.response, state);
        default:
            return state;
    }
}

function reduceFetchMostPopularVideos(response, prevState) {
    const videoMap = response.items.reduce((acc, video) => {
        acc[video.id] = video;
        return acc;
    }, {});
    let items = Object.keys(videoMap);
    if (response.hasOwnProperty('prevPageToken') && prevState.mostPopular) {
        console.log(response.haOwnProperty('prevPageToken') && prevState.mostPopular)
        items = [...prevState.mostPopular.items, ...items];
    }

    const mostPopular = {
        totalResults: response.pageInfo.totalResults,
        nextPageToken: response.nextPageToken,
        items,
    };

    return {
        ...prevState,
        mostPopular,
        byId: { ...prevState.byId, ...videoMap},
    };
}