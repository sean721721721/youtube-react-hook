import React from 'react';
import VideoGrid from '../../../components/VideoGrid/VideoGrid';
import './HomeContent.scss';
import {useSelector} from 'react-redux';
const HomeContent = () => {
    const trendingVideos = useSelector(state => Object.values(state.videos.byId));
    console.log(trendingVideos);
    return ( 
        <div className = "home-content" >
            <div className = "responsive-video-grid-container" >
                <VideoGrid title = "Trending" videos={trendingVideos}/>
            </div> 
        </div>
    )
}

export default HomeContent;