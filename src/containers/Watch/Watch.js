import React, { useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchParam} from '../../services/url';
import WatchContent from './WatchContent/WatchContent';
import { getCommentNextPageToken } from '../../store/reducers/comments';
import * as commentActions from '../../store/actions/comment';
import useFetchWatchContent from './useFetchWatchContent';

const fetchCommentThread = commentActions.thread.requset;

const Watch = (props) => {
    const videoId = getVideoId(props.location);
    const channelId = useSelector(state => {
        const videoId = getSearchParam(props.location, 'v')
        const video = state.videos.byId[videoId];
        return video ? video.snippet.channelId : null;
    })
    const nextPageToken = useSelector(state => {
        const comment = state.comments.byVideo[videoId];
        return getCommentNextPageToken(comment);
    })
    const dispatch = useDispatch();
    
    useFetchWatchContent(props.location, props.history, channelId);

    function getVideoId(location) {
        return getSearchParam(location, 'v');
    }

    const memoizedFetchMoreComments = useCallback(
        () => {
            if (nextPageToken) {
                dispatch(fetchCommentThread(videoId, nextPageToken));
            }
        }, [
            nextPageToken,
            dispatch,
            videoId
        ]);

    return (
        <WatchContent videoId={videoId} 
                      channelId={channelId}
                      bottomReachedCallback={memoizedFetchMoreComments}
                      nextPageToken={nextPageToken}
        />
    )
}

export default Watch;