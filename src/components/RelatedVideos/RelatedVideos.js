import React from 'react';
import VideoPreview from '../VideoPreview/VIdeoPreview';
import './RelatedVideos.scss';
import NextUpVideo from './NextUpVideo/NextUpVideo';

const RelatedVideos = (props) => {
    if(!props.videos || !props.videos.length) {
        return <div className="related-videos"/>;
    }

    const nextUpVideo = props.videos[0];
    const remaininVideos = props.videos.slice(1);
    const relatedVideosPreviews = remaininVideos.map(relatedVideo => {
        return (<VideoPreview video={relatedVideo}
                      key={relatedVideo.id}
                      pathname="/watch"
                      search={`?v=${relatedVideo.id}`}
                      horizontal={true}/>);
    });
    return (
        <div className="related-videos">
            <NextUpVideo video={nextUpVideo}/>
            {relatedVideosPreviews}
        </div>
    )
}

export default RelatedVideos;