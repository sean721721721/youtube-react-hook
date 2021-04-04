import {VIDEO_DETAILS, WATCH_DETAILS} from '../actions/watch';
import {SUCCESS} from '../actions';
import {CHANNEL_LIST_RESPONSE} from '../api/youtube-response-types';

const initialState = {
    byId: {},
}

export default function (state = initialState, action) {
    console.log(action.type, state);
    switch (action.type) {
        case WATCH_DETAILS[SUCCESS]:
            return reduceWatchDetails(action.response, state);
        case VIDEO_DETAILS[SUCCESS]:
            return reduceVideoDetails(action.response, state);
        default:
            return state;
    }
}

function reduceWatchDetails(responses, prevState) {
    console.log(responses);
    const channelResponse = responses.find(response => {
        return response.result.kind === CHANNEL_LIST_RESPONSE;
    });
    let channels = {};
    if (channelResponse && channelResponse.result.items) {
        console.log(channelResponse)
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

function reduceVideoDetails(responses, prevState) {
    console.log(responses);
    const channelResponse = responses.find(response => {
        return response.result.kind === CHANNEL_LIST_RESPONSE;
    });
    let channelEntry = {};
    if (channelResponse && channelResponse.result.items) {
        console.log(channelResponse);
        const channel = channelResponse.result.items[0];
        channelEntry = {
            [channel.id]: channel,
        }
    }

    return {
        ...prevState,
        byId: {
            ...prevState.byId,
            ...channelEntry,
        }
    };
}