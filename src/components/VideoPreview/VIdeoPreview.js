import React from 'react';
import {Image} from 'semantic-ui-react';
import './VideoPreview.scss';

import TimeAgo from 'javascript-time-ago';
import zh from 'javascript-time-ago/locale/zh';
import {getShortNumberString} from '../../services/number/number-format';
import {getVideoDurationString} from '../../services/date/date-format';

TimeAgo.locale(zh);
const timeAgo = new TimeAgo('zh');

const VideoPreview = (props) => {
    const {video} = props;
    if (!video) {
        return <div/>;
    }

    const duration = video.contentDetails ? video.contentDetails.duration : null;
    const videoDuration = getVideoDurationString(duration);
    const viewAndTimeString = getFormattedViewAndTime(video);
    const horizontal = props.horizontal ? 'horizontal' : null;

    function getFormattedViewAndTime(video) {
        const publicationDate = new Date(video.snippet.publishedAt);
        const viewCount = video.statistics ? video.statistics.viewCount : null;
        if (viewCount) {
            const viewCountShort = getShortNumberString(viewCount);
            return `${viewCountShort} views • ${timeAgo.format(publicationDate)}`;
        }
        return '';
        
    }
    return (
        <div className={["video-preview", horizontal].join(' ')}>
            <div className="image-container">
                <Image src={video.snippet.thumbnails.medium.url}/>
                <div className="time-label">
                    <span>{videoDuration}</span>
                </div>
            </div>
            <div className="video-info">
                <div className="semi-bold show-max-two-lines">{video.snippet.title}</div>
                <div className="video-preview-metadata-container">
                    <div className="channel-title">{video.snippet.channelTitle}</div>
                    <div><span>{viewAndTimeString}</span></div>                    
                </div>
            </div>
        </div>
    )
}

export default VideoPreview;