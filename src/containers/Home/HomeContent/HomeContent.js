import React, {useEffect, useState} from 'react';
import VideoGrid from '../../../components/VideoGrid/VideoGrid';
import {InfiniteScroll} from '../../../components/InfiniteScroll/InfiniteScroll';
import './HomeContent.scss';
import {useSelector} from 'react-redux';
import {getVideosByCategory} from '../../../store/reducers/videos';

const AMOUNT_TRENDING_VIDEOS = 12;

const HomeContent = (props) => {
    const trendingVideos = useSelector(state => {
        console.log(state);
        return Object.values(state.videos.byId).slice(0, AMOUNT_TRENDING_VIDEOS);
    });
    const videosByCategory = useSelector(state => {
        const {byCategory, byId, categories} = state.videos;
        return getVideosByCategory(byCategory, byId, categories);
    });
    const categoryGrid = getVideoGridsForCategories();
    function getVideoGridsForCategories() {
        const categoryTitles = Object.keys(videosByCategory || {});
        return categoryTitles.map((categoryTitle,index) => {
            const videos = videosByCategory[categoryTitle];
            const hideDivider = index === categoryTitles.length - 1;
            return <VideoGrid title={categoryTitle} videos={videos} key={categoryTitle} hideDivider={hideDivider}/>;
        });
    }

    return (
        <div className = "home-content" >
            <div className ='responsive-video-grid-container' >
                <InfiniteScroll bottomReachedCallback={props.bottomReachedCallback} showLoader={props.showLoader}>
                    <VideoGrid title="Trending" videos={trendingVideos} />
                    {categoryGrid}
                </InfiniteScroll>
            </div> 
        </div>
    )
}

export default HomeContent;