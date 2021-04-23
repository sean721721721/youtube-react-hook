import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as watchActions from '../../store/actions/watch';
import {getSearchParam} from '../../services/url';

const fetchWatchDetails = watchActions.details.request;

export default function useFetchWatchContent (location, history, channelId) {
    const youtubeLibraryLoaded = useSelector(state => state.api.libraryLoaded);
    const dispatch = useDispatch();
    useEffect(() => {
        if (youtubeLibraryLoaded) {
            fetchWatchContent(); 
        }
        function fetchWatchContent() {
            const videoId = getVideoId(location);
            if(!videoId) {
                history.push('/');
            }
            dispatch(fetchWatchDetails(videoId, channelId));
        }
    }, [
        channelId,
        dispatch,
        history,
        location,
        youtubeLibraryLoaded
    ]);
    function getVideoId(location) {
        return getSearchParam(location, 'v');
    }
}