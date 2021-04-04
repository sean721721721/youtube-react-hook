import {MOST_POPULAR, MOST_POPULAR_BY_CATEGORY, VIDEO_CATEGORIES} from '../actions/video';
import {SUCCESS} from '../actions';
import {VIDEO_LIST_RESPONSE, SEARCH_LIST_RESPONSE} from '../api/youtube-response-types';
import {getSearchParam} from '../../services/url';
import {VIDEO_DETAILS, WATCH_DETAILS} from '../actions/watch';

const initialState = {
    byId: {},
    mostPopular: {},
    categories: {},
    byCategory: {},
    related: {},
};

export default function videos(state = initialState, action) {
    console.log(action, state);
    switch (action.type) {
        case MOST_POPULAR[SUCCESS]:
            return reduceFetchMostPopularVideos(action.response, state);
        case VIDEO_CATEGORIES[SUCCESS]:
            return reduceFetchVideoCategories(action.response, state);
        case MOST_POPULAR_BY_CATEGORY[SUCCESS]:
            return reduceFetchMostPopularVideosByCategory(action.response, action.categories, state);
        case WATCH_DETAILS[SUCCESS]:
            return reduceWatchDetails(action.response, state);
        case VIDEO_DETAILS[SUCCESS]:
            return reduceVideoDetails(action.response, state);
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

function reduceFetchVideoCategories(response, prevState) {
    const categoryMapping = response.items.reduce((acc, category) => {
        acc[category.id] = category.snippet.title;
        return acc;
    }, {});
    return {
        ...prevState,
        categories: categoryMapping,
    };
}

function reduceFetchMostPopularVideosByCategory(response, categories, prevState) {
    let videoMap = {};
    let byCategoryMap = {};
    response.forEach((response, index) => {
        if (response.status === 400) return;
        const categoryId = categories[index];
        const {byId, byCategory} = groupVideosByIdAndCategory(response.result);
        videoMap = {...videoMap, ...byId};
        byCategoryMap[categoryId] = byCategory;
    
    });

    return {
        ...prevState,
        byId: {...prevState.byId, ...videoMap},
        byCategory: {...prevState.byCategory, ...byCategoryMap},
    };
}

function reduceRelatedVideosRequest(responses) {
    const relatedVideosResponse = responses.find(r => r.result.kind === SEARCH_LIST_RESPONSE);
    const {pageInfo, items, nextPageToken} = relatedVideosResponse.result;
    const relatedVideoIds = items.map(video => video.id);

    return {
        totalResults: pageInfo.totalResults,
        nextPageToken,
        items: relatedVideoIds,
    }
}

function reduceVideoDetails(responses, prevState) {
    const videoResponses = responses.filter(response => response.result.kind === VIDEO_LIST_RESPONSE);
    const parsedVideos = videoResponses.reduce((videoMap, response) => {
        const video = response.result.items ? response.result.items[0] : null;
        if (!video) {
            return videoMap;
        }
        videoMap[video.id] = video;
        return videoMap;
    }, {});

    return {
        ...prevState,
        byId: {...prevState.byId, ...parsedVideos},
    };
}

function groupVideosByIdAndCategory(response) {
    const videos = response.items;
    const byId = {};
    const byCategory = {
        totalResults: response.pageInfo.totalResults,
        nextPageToken: response.nextPageToken,
        items: [],
    };

    videos.forEach((video) => {
        byId[video.id] = video;

        const items = byCategory.items;
        if (items && items) {
            items.push(video.id);
        } else {
            byCategory.items = [video.id];
        }
    });

    return {byId, byCategory};
}

function reduceWatchDetails(responses, prevState) {
    const videoDetailResponse = responses.find(r => r.result.kind === VIDEO_LIST_RESPONSE);
    const video = videoDetailResponse.result.items[0];
    const relatedEntry = reduceRelatedVideosRequest(responses);

    return {
        ...prevState,
        byId: {
            ...prevState.byId,
            [video.id]: video,
        },
        related: {
            ...prevState.related,
            [video.id]: relatedEntry
        }
    };
}

export const getVideosByCategory = (videosByCategory, videosById, categories) => {
    // console.log(videosByCategory, videosById, categories);
    return Object.keys(videosByCategory || {}).reduce((accumulator, categoryId) => {
        const videoIds = videosByCategory[categoryId].items;
        const categoryTitle = categories[categoryId];
        accumulator[categoryTitle] = videoIds.map(videoId => videosById[videoId]);
            return accumulator;
        }, {});
};

export const getVideosByCategoryLoaded = (videosByCategory) => {
    return Object.keys(videosByCategory || {}).length;   
}

export const getChannelId = (state, location, name) => {
    const videoId = getSearchParam(location, name);
    const video = state.videos.byId[videoId];
    if (video) {
      return video.snippet.channelId;
    }
    return null;
};