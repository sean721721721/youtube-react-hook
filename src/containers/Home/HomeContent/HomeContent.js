import React from 'react';
import VideoGrid from '../../../components/VideoGrid/VideoGrid';
import {InfiniteScroll} from '../../../components/InfiniteScroll/InfiniteScroll';
import './HomeContent.scss';
import {useSelector} from 'react-redux';

const HomeContent = () => {
    const trendingVideos = useSelector(state => Object.values(state.videos.byId));
    const videosByCategory = useSelector(state => {
        const {byCategories, byId, categories} = state;
        return Object.keys(byCategories || {}).reduce((accumulator, categoryId) => {
            const videoIds = byCategories[categoryId].items;
            const categoryTitle = categories[categoryId];
            accumulator[categoryTitle] = videoIds.map(videoId => byId[videoId]);
            return accumulator;
        }, {});
    });
    const videoCategoriesLoaded = useSelector(state => Object.keys(state.videos.categories || {}).length !== 0);
    const categoryGrid = getVideoGridsForCategories();
    console.log(videoCategoriesLoaded);
    function getVideoGridsForCategories() {
        const categoryTitles = Object.keys(videosByCategory || {});
        return categoryTitles.map((categoryTitle,index) => {
            const videos = this.props.videosByCategory[categoryTitle];
            const hideDivider = index === categoryTitles.length - 1;
            return <VideoGrid title={categoryTitle} videos={videos} key={categoryTitle} hideDivider={hideDivider}/>;
        });
    }

    function bottomReachedCallback() {
        if (!videoCategoriesLoaded) {
            return;
        }
        fetchVideosByCategory();
    }
    return (
        <div className = "home-content" >
            <div className = "responsive-video-grid-container" >
                <InfiniteScroll bottomReachedCallback={bottomReachedCallback} showLoader={showLoader}>
                    <VideoGrid title = "Trending" videos={trendingVideos} />
                    {categoryGrid}
                </InfiniteScroll>
            </div> 
        </div>
    )
}

export default HomeContent;