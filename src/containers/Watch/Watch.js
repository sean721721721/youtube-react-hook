import React, { useEffect } from 'react';
import Video from '../../components/Video/Video';
import RelatedVideos from '../../components/RelatedVideos/RelatedVideos';
import VideoMetadata from '../../components/VideoMetadata/VideoMetadata';
import VideoInfoBox from '../../components/VideoInfoBox/VideoInfoBox';
import Comments from '../Comments/Comments';
import {useDispatch, useSelector} from 'react-redux';
import * as watchActions from '../../store/actions/watch';
import {getSearchParam} from '../../services/url';
import WatchContent from './WatchContent/WatchContent';
import { getChannelId } from '../../store/reducers/videos';

const fetchWatchDetails = watchActions.details.request;

const Watch = (props) => {
    console.log(props);
    const channelId = useSelector(state => {
        const videoId = getSearchParam(props.location, 'v')
        const video = state.videos.byId[videoId];
        if (video) {
            return video.snippet.channelId;
        }
        return null;
    })
    const videoId = getVideoId();
    const youtubeLibraryLoaded = useSelector(state => state.api.libraryLoaded);
    // const channelId = useSelector(state => getChannelId(state, props.location, 'v'));
    const dispatch = useDispatch();
    useEffect(() => {
        if (youtubeLibraryLoaded) {
            fetchWatchContent(); 
        }
    }, [youtubeLibraryLoaded])

    function getVideoId() {
        return getSearchParam(props.location, 'v');
    }
    
    function fetchWatchContent() {
        const videoId = getVideoId();
        if(!videoId) {
            props.history.push('/');
        }
        console.log(videoId, channelId)
        dispatch(fetchWatchDetails(videoId, channelId));
    }
    return (
        // <div className="watch-grid">
        //     <Video className="video" id="-7fuHEEmEjs" />
        //     <VideoMetadata viewCount={1000}/>
        //     <VideoInfoBox className="video-info-box" collapsed={true} />
        //     <Comments className="comments"/>
        //     <RelatedVideos/>            
        // </div>
        <WatchContent videoId={videoId} channelId={channelId}/>
    )
}

export default Watch;