import React from 'react';
import Video from '../../../components/Video/Video';
import VideoMetadata from '../../../components/VideoMetadata/VideoMetadata';
import VideoInfoBox from '../../../components/VideoInfoBox/VideoInfoBox';
import Comments from '../../Comments/Comments';
import RelatedVideos from '../../../components/RelatedVideos/RelatedVideos';
import './WatchContent.scss';
import { useSelector } from 'react-redux';
import { getAmountComments, getRelatedVideos } from '../../../store/reducers/videos';
import { getCommentNextPageToken, getCommentsForVideo } from '../../../store/reducers/comments';
import { InfiniteScroll } from '../../../components/InfiniteScroll/InfiniteScroll';

const WatchContent = (props) => {
    console.log(props);
    const video = useSelector(state => {
        return state.videos.byId[props.videoId];
    });

    const relatedVideos = useSelector(state => getRelatedVideos(state, props.videoId));
    const channel = useSelector(state => state.channels.byId[props.channelId]);
    const comments = useSelector(state => getCommentsForVideo(state.comments, props.videoId));
    const amountComments = getAmountComments(video);

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