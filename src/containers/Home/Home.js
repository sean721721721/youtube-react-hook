import React, {useEffect, useRef, useState} from 'react';
import SideBar from '../SideBar/SideBar';
import HomeContent from './HomeContent/HomeContent';
import {useDispatch, useSelector} from "react-redux";
import * as videoActions from "../../store/actions/video";
import {getVideosByCategoryLoaded} from '../../store/reducers/videos';

const fetchMostPopularVideos = videoActions.mostPopular.request;
const fetchVideoCategories = videoActions.categories.request;
const fetchMostPopularVideosByCategory = videoActions.mostPopularByCategory.request;

const Home = () => {
    const [categoryIndex, setCategoryIndex] = useState(0);
    const youtubeLibraryLoaded = useSelector(state => state.api.libraryLoaded);
    const videoCategories = useSelector(state => {
        return Object.keys(state.videos.categories || {});
    });
    const prevVideoCategories = usePreviousVideoCategories(videoCategories);
    const videoCategoriesLoaded = useSelector(state => Object.keys(state.videos.categories || {}).length !== 0);
    const videosByCategoryLoaded = useSelector(state => {
        return getVideosByCategoryLoaded(state.videos.byCategory);
    })
    const dispatch = useDispatch();

    useEffect(() => {
        if (prevVideoCategories && (videoCategories.length !== prevVideoCategories.length)) {
            fetchVideosByCategory();
        }
    });

    useEffect(() => { 
        if (youtubeLibraryLoaded) {
            dispatch(fetchMostPopularVideos());
            dispatch(fetchVideoCategories());
        }
    }, [dispatch, youtubeLibraryLoaded]);

    function usePreviousVideoCategories(categories) {
        const ref = useRef();
        useEffect(() => {
            ref.current = categories ? categories : [];
        });
        return ref.current;
    }

    function fetchVideosByCategory() {
        const categories = videoCategories.slice(categoryIndex, categoryIndex + 3);
        dispatch(fetchMostPopularVideosByCategory(categories));
        setCategoryIndex(categoryIndex + 3);
    }

    function bottomReachedCallback() {
        if (!videoCategoriesLoaded) {
            return;
        }
        fetchVideosByCategory();
    }

    function shouldShowLoader() {
        if (videoCategoriesLoaded && videosByCategoryLoaded ) {
            return categoryIndex < videoCategories.length;
        }
        return false;
    }

    return (
        <React.Fragment>
            <SideBar/>
            <HomeContent 
                bottomReachedCallback={bottomReachedCallback}
                showLoader={shouldShowLoader()}/>
        </React.Fragment>
    )
}

export default Home;