import React, {useEffect, useMemo}from 'react';
import Video from '../../../components/Video/Video';
import VideoMetadata from '../../../components/VideoMetadata/VideoMetadata';
import VideoInfoBox from '../../../components/VideoInfoBox/VideoInfoBox';
import Comments from '../../Comments/Comments';
import RelatedVideos from '../../../components/RelatedVideos/RelatedVideos';
import './WatchContent.scss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAmountComments, getRelatedVideos } from '../../../store/reducers/videos';
import { getCommentsForVideo } from '../../../store/reducers/comments';
import { InfiniteScroll } from '../../../components/InfiniteScroll/InfiniteScroll';
import * as historyAction from '../../../store/actions/history';

const saveWatchedVideo = historyAction.watchedVideo;
    
const WatchContent = (props) => {
    const video = useSelector(state => state.videos.byId[props.videoId]);
    const relatedVideos = useSelector(state => getRelatedVideos(state, props.videoId), shallowEqual);
    const channel = useSelector(state => state.channels.byId[props.channelId], shallowEqual);
    const comments = useSelector(state => getCommentsForVideo(state.comments, props.videoId), shallowEqual);
    const amountComments = getAmountComments(video);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (video && video.id) {
            dispatch(saveWatchedVideo({[props.videoId]: video}));
        }
    }, [props.nextPageToken]);

    function shouldShowLoader() {
        return !!props.nextPageToken;
    }

    if (!props.videoId) {
        return <div/>
    }

    return (
        <InfiniteScroll bottomReachedCallback={props.bottomReachedCallback} showLoader={shouldShowLoader()}>
            <div className='watch-grid'>
                <Video className='video' id={props.videoId}/>
                <VideoMetadata video={video}/>
                <VideoInfoBox className='video-info-box' video={video} channel={channel}/>
                <Comments className='comments' comments={comments} amountComments={amountComments}/>
                <RelatedVideos className='relatedVideos' videos={relatedVideos}/>
            </div>
        </InfiniteScroll>
    );
}

export default WatchContent;