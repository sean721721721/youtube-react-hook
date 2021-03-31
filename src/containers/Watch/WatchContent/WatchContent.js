import React from 'react';
import Video from '../../../components/Video/Video';
import VideoMetadata from '../../../components/VideoMetadata/VideoMetadata';
import VideoInfoBox from '../../../components/VideoInfoBox/VideoInfoBox';
import Comments from '../../Comments/Comments';
import RelatedVideos from '../../../components/RelatedVideos/RelatedVideos';
import './WatchContent.scss';
import { useSelector } from 'react-redux';

const WatchContent = (props) => {
    const video = useSelector(state => {
        return state.videos.byId[props.videoId];
    });

    const relatedVideos = useSelector(state => {
        const related = state.videos.related[props.videoId];
        const relatedVideoIds = related ? related.items : [];
        const videos = state.videos.byId;
        if (relatedVideoIds) {
            return relatedVideoIds.map(item => videos[item.videoId])
                .filter(video => video);
        }
        return [];
    })
    

    if (!props.videoId) {
        return <div/>
    }
    return (
        <div className='watch-grid'>
            <Video className='video' id={props.videoId}/>
            <VideoMetadata video={video}/>
            <VideoInfoBox className='video-info-box' video={video}/>
            <Comments className='comments'/>
            <RelatedVideos className='relatedVideos' videos={relatedVideos}/>
        </div>
    );
}

export default WatchContent;