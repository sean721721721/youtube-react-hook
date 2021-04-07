import React, { useEffect } from 'react';
import * as videoActions from '../../store/actions/video';
import {
    getMostPopularVideos,
    allMostPopularVideosLoaded,
    getMostPopularVideosNextPageToken,
} from '../../store/reducers/videos';
import { useDispatch, useSelector } from 'react-redux';
import VideoList from '../../components/VideoList/VideoList';

const fetchMostPopularVideos = videoActions.mostPopular.request;

const Trending = () => {

    const videos = useSelector(state => getMostPopularVideos(state));
    const youtubeLibraryLoaded = useSelector(state => state.api.libraryLoaded);
    const allMostPopularVideosIsLoaded = useSelector(state => allMostPopularVideosLoaded(state));
    const nextPageToken = useSelector(state => getMostPopularVideosNextPageToken(state));
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetchTrendingVideos();
    }, []);

    useEffect(() => {
        fetchTrendingVideos();
    }, [youtubeLibraryLoaded]);

    function fetchTrendingVideos() {
        if (youtubeLibraryLoaded) {
            dispatch(fetchMostPopularVideos(20, true));
        }
    }
    
    function shouldShowLoader() {
        return !allMostPopularVideosIsLoaded;
    }

    function fetchMoreVideos() {
        if (youtubeLibraryLoaded && nextPageToken) {
            dispatch(fetchMostPopularVideos(12, true, nextPageToken));
        }
    }

    return (
        <VideoList 
            bottomReachedCallback={fetchMoreVideos}
            showLoader={shouldShowLoader()}
            videos={videos}
        />
    )
}

export default Trending;