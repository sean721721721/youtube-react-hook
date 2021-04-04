import {VIDEO_DETAILS, WATCH_DETAILS} from '../actions/watch';
import {SUCCESS} from '../actions';
import {CHANEEL_LIST_RESPONSE} from '../api/youtube-response-types';

const initialState = {
    byId: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case WATCH_DETAILS[SUCCESS]:
            return reduceWatchDetails(action.reponse, state);
        default:
            return state;
    }
}

function reduceWatchDetails(responses, prevState) {
    const channelResponse = responses.find(response => {
        return response.result.kind === CHANEEL_LIST_RESPONSE;
    });
    let channels = {};
    if (channelResponse && channelResponse.result.items) {
        const channel = channelResponse.result.items[0];
        channels[channel.id] = channel;
    }
    return {
        ...prevState,
        byId: {
            ...prevState.byId,
            ...channels
        }
    };
}