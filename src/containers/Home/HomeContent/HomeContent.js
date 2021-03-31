import React from 'react';
import VideoGrid from '../../../components/VideoGrid/VideoGrid';
import './HomeContent.scss';

const HomeContent = () => {
    return ( 
        <div className = "home-content" >
            <div className = "responsive-video-grid-container" >
                <VideoGrid title = "Trending"/>
                <VideoGrid title = "Autos & Vehicles" hideDivider = {true}/> 
            </div> 
        </div>
    )
}

export default HomeContent;