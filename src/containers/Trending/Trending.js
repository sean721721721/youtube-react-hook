import React, { useEffect } from 'react';
import './Trending.scss';
import VideoPreview from '../../components/VideoPreview/VIdeoPreview';
import SideBar from '../SideBar/SideBar';
import * as videoActions from '../../store/actions/video';
import {
    getMostPopularVideos,
    allMostPopularVideosLoaded,
    getMostPopularVideosNextPageToken,
} from '../../store/reducers/videos';
import { useDispatch, useSelector } from 'react-redux';
import { InfiniteScroll } from '../../components/InfiniteScroll/InfiniteScroll';

const fetchMostPopularVideos = videoActions.mostPopular.request;

const Trending = () => {

    const videos = useSelector(state => getMostPopularVideos(state));
    const previews = getVideoPreviews();
    const youtubeLibraryLoaded = useSelector(state => state.api.libraryLoaded);
    const allMostPopularVideosIsLoaded = useSelector(state => allMostPopularVideosLoaded(state));
    const nextPageToken = useSelector(state => getMostPopularVideosNextPageToken(state));
    console.log(videos, youtubeLibraryLoaded, allMostPopularVideosIsLoaded, nextPageToken);
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetchTrendingVideos();
    }, []);

    useEffect(() => {
        fetchTrendingVideos();
    }, [youtubeLibraryLoaded]);

    function fetchTrendingVideos() {
        console.log('fetchTrendingVideos: ', youtubeLibraryLoaded);
        if (youtubeLibraryLoaded) {
            dispatch(fetchMostPopularVideos(20, true));
        }
    }
    
    function getVideoPreviews() {
        return videos.map(video => (
            <VideoPreview horizontal={true} expanded={true} video={video}
                          search={`?v=${video.id}`}/>
        ));
    }

    function shouldShowLoader() {
        return !allMostPopularVideosIsLoaded;
    }

    function fetchMoreVideos() {
        console.log('fetchMoreVideos')
        console.log(youtubeLibraryLoaded, nextPageToken)
        if (youtubeLibraryLoaded && nextPageToken) {
            dispatch(fetchMostPopularVideos(12, true, nextPageToken));
        }
    }

    return (
        <React.Fragment>
            <SideBar/>
            <div className="trending">
                <InfiniteScroll bottomReachedCallback={fetchMoreVideos} showLoader={shouldShowLoader()}>
                    {previews}
                </InfiniteScroll>
            </div>
        </React.Fragment>
    )
}

export default Trending;