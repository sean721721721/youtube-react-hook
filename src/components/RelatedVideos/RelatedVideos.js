import React from 'react';
import VideoPreview from '../VideoPreview/VIdeoPreview';
import './RelatedVideos.scss';
import NextUpVideo from './NextUpVideo/NextUpVideo';

const RelatedVideos = (props) => {
    console.log(props)
    if(props.videos || props.videos.length) {
        return <div className="related-videos"/>;
    }

    const nextUpVideo = props.videos[0];
    const remaininVideos = props.videos.slilce(1);
    console.log(remaininVideos)
    const relatedVideosPreviews = remaininVideos.map(relatedVideo => {
        return (<VideoPreview video={relatedVideo}
                      key={relatedVideo.id}
                      pathname="/watch"
                      search={`?v=${relatedVideo.id}`}
                      horizontal={true}/>);
    });
    console.log(relatedVideosPreviews)
    return (
        <div className="related-videos">
            <NextUpVideo video={nextUpVideo}/>
            {relatedVideosPreviews}
        </div>
    )
}

export default RelatedVideos;