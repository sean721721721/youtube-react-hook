import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as watchActions from '../../store/actions/watch';
import {getSearchParam} from '../../services/url';
import WatchContent from './WatchContent/WatchContent';
import { getCommentNextPageToken } from '../../store/reducers/comments';
import * as commentActions from '../../store/actions/comment';

const fetchWatchDetails = watchActions.details.request;
const fetchCommentThread = commentActions.thread.requset;

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
    const nextPageToken = useSelector(state => {
        const comment = state.comments.byVideo[videoId];
        return getCommentNextPageToken(comment);
    })
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

    function fetchMoreComments() {
        if (nextPageToken) {
            console.log('fetchCommentThread');
            dispatch(fetchCommentThread(videoId, nextPageToken));
        }
    }
    return (
        // <div className="watch-grid">
        //     <Video className="video" id="-7fuHEEmEjs" />
        //     <VideoMetadata viewCount={1000}/>
        //     <VideoInfoBox className="video-info-box" collapsed={true} />
        //     <Comments className="comments"/>
        //     <RelatedVideos/>            
        // </div>
        <WatchContent videoId={videoId} 
                      channelId={channelId}
                      bottomReachedCallback={fetchMoreComments}
                      nextPageToken={nextPageToken}
        />
    )
}

export default Watch;