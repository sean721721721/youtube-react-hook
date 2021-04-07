import React from 'react';
import SideBar from '../../containers/SideBar/SideBar';
import {InfiniteScroll} from '../InfiniteScroll/InfiniteScroll';
import VideoPreview from '../VideoPreview/VIdeoPreview';
import './VideoList.scss';

const VideoList = (props) => {
    const videoPreviews = getVideoPreviews();

    function getVideoPreviews() {
        if (!props.videos || !props.videos.length) {
            return null;
        }
        
        const firstVideo = props.videos[0];
        if (!firstVideo.snippet.description) {
            return null;
        }

        return props.videos.map(video => (
            <VideoPreview horizontal={true}
                          expanded={true} 
                          video={video}
                          key={video.id}
                          pathname={'/watch'}
                          search={`?v=${video.id}`}/>
        ));
    }

    return (
        <React.Fragment>
            <SideBar/>
            <div className="video-list">
                <InfiniteScroll bottomReachedCallback={props.bottomReachedCallback} showLoader={props.showLoader}>
                    {videoPreviews}
                </InfiniteScroll>
            </div>
        </React.Fragment>
    )
}

export default VideoList;