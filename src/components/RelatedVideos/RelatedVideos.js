import React from 'react';
import VideoPreview from '../VideoPreview/VIdeoPreview';
import './RelatedVideos.scss';
import NextUpVideo from './NextUpVideo/NextUpVideo';

const RelatedVideos = (props) => {
    return (
        <div className="related-videos">
            <NextUpVideo/>
            <VideoPreview horizontal={true}/>
            <VideoPreview horizontal={true}/>
            <VideoPreview horizontal={true}/>
        </div>
    )
}

export default RelatedVideos;