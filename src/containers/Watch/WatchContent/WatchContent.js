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
    
    const videoComponent = useMemo(() => 
        <Video className='video' id={props.videoId}/>,
        [props.videoId]);
    const videoMetadataComponent = useMemo(() =>
        <VideoMetadata video={video}/>,
        [video]);
    const videoInfoBoxComponent = useMemo(() => 
        <VideoInfoBox className='video-info-box' video={video} channel={channel}/>,
        [video, channel]);
    const commentsComponent = useMemo(() =>
        <Comments className='comments' comments={comments} amountComments={amountComments}/>,
        [comments, amountComments]);
    const relatedVideosComponent = useMemo(() => 
        <RelatedVideos className='relatedVideos' videos={relatedVideos}/>,
        [relatedVideos]);

    useEffect(() => {
        if (video && video.id) {
            dispatch(saveWatchedVideo({[props.videoId]: video}));
        }
    }, [dispatch, props.nextPageToken, props.videoId, video]);

    function shouldShowLoader() {
        return !!props.nextPageToken;
    }

    if (!props.videoId) {
        return <div/>
    }

    return (
        <InfiniteScroll bottomReachedCallback={props.bottomReachedCallback} showLoader={shouldShowLoader()}>
            <div className='watch-grid'>
                {videoComponent}
                {videoMetadataComponent}
                {videoInfoBoxComponent}
                {commentsComponent}
                {relatedVideosComponent}
            </div>
        </InfiniteScroll>
    );
}

export default WatchContent;