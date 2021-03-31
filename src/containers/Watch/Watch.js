import React from 'react';
import './Watch.scss';
import Video from '../../components/Video/Video';
import RelatedVideos from '../../components/RelatedVideos/RelatedVideos';
import VideoMetadata from '../../components/VideoMetadata/VideoMetadata';
import VideoInfoBox from '../../components/VideoInfoBox/VideoInfoBox';
import Comments from '../Comments/Comments';

const Watch = () => {
    return (
        <div className="watch-grid">
            <Video className="video" id="-7fuHEEmEjs" />
            <VideoMetadata viewCount={1000}/>
            <VideoInfoBox className="video-info-box" collapsed={true} />
            <Comments className="comments"/>
            <RelatedVideos/>            
        </div>
    )
}

export default Watch;