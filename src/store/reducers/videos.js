import {MOST_POPULAR, MOST_POPULAR_BY_CATEGORY, VIDEO_CATEGORIES} from '../actions/video';
import {SUCCESS} from '../actions';

const initialState = {
    byId: {},
    mostPopular: {},
    categories: {},
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