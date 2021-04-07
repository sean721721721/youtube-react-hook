import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import VideoList from '../../components/VideoList/VideoList';
import {getAmountVideos, getWatchedVideos} from '../../store/reducers/history';

const History = () => {
    const [index, setIndex] = useState(6);
    const watchedVideos = useSelector(state => getWatchedVideos(state.history, index));
    const amountVideos = useSelector(state => getAmountVideos(state.history));

    function fetchMoreVideos() {
        if (index < amountVideos) {
            setIndex(index + 6);
        }
    }

    function shouldShowLoader() {
        return index < amountVideos;
    }

    return (
        <VideoList videos={watchedVideos}
                   showLoader={shouldShowLoader()}
                   bottomReachedCallback={fetchMoreVideos}
        />
    );
}

export default History;