import {MOST_POPULAR} from '../actions/video';
import {SUCCESS} from '../actions';

const initialState = {
    byId: {},
    mostPopular: {},
};

export default function videos(state = initialState, action) {
    switch (action.type) {
        case MOST_POPULAR[SUCCESS]:
            return reduceFetchMostPopularVideos(action.response, state);
        default:
            return state;
    }
}