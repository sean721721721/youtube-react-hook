import React from 'react';
import VideoGrid from '../../../components/VideoGrid/VideoGrid';
import {InfiniteScroll} from '../../../components/InfiniteScroll/InfiniteScroll';
import './HomeContent.scss';
import {useSelector} from 'react-redux';

const HomeContent = (props) => {
    console.log(props);
    const trendingVideos = useSelector(state => Object.values(state.videos.byId));

    const videosByCategory = useSelector(state => {
        console.log(state.videos);
        let {byCategory, byId, categories} = state.videos;
        byCategory = byCategory ? byCategory : {};
        console.log(state.videos)
        return Object.keys(byCategory).reduce((accumulator, categoryId) => {
            console.log(byCategory)
            const videoIds = byCategory[categoryId].items;
            const categoryTitle = categories[categoryId];
            accumulator[categoryTitle] = videoIds.map(videoId => byId[videoId]);
            console.log(accumulator)
            return accumulator;
        }, {});
    });
    console.log(videosByCategory)
    const categoryGrid = getVideoGridsForCategories();
    console.log(categoryGrid)
    function getVideoGridsForCategories() {
        const categoryTitles = Object.keys(videosByCategory || {});
        console.log(categoryTitles)
        return categoryTitles.map((categoryTitle,index) => {
            const videos = videosByCategory[categoryTitle];
            const hideDivider = index === categoryTitles.length - 1;
            return <VideoGrid title={categoryTitle} videos={videos} key={categoryTitle} hideDivider={hideDivider}/>;
        });
    }

    return (
        <div className = "home-content" >
            <div className = "responsive-video-grid-container" >
                {/* <InfiniteScroll bottomReachedCallback={props.bottomReachedCallback} showLoader={props.showLoader}> */}
                    <VideoGrid title = "Trending" videos={trendingVideos} />
                    {categoryGrid}
                {/* </InfiniteScroll> */}
            </div> 
        </div>
    )
}

export default HomeContent;