import React, {useCallback, useEffect} from 'react';
import {getSearchNextPageToken, getSearchResults} from '../../store/reducers/search';
import * as searchActions from '../../store/actions/search';
import './Search.scss';
import { useDispatch, useSelector } from 'react-redux';
import {getSearchParam} from '../../services/url';
import { withRouter } from 'react-router';
import VideoList from '../../components/VideoList/VideoList';

const searchForVideos = searchActions.forVideos.request;

const Search = (props) => {
    const youtubeApiLoaded = useSelector(state => state.api.libraryLoaded);
    const searchResults = useSelector(state => getSearchResults(state));
    const nextPageToken = useSelector(state => getSearchNextPageToken(state));
    const dispatch = useDispatch();

    const getSearchQuery = useCallback(() => getSearchParam(props.location, 'search_query')
        , [props.location]
    );

    const searching = useCallback(() => {
        const searchQuery = getSearchQuery();
        if (youtubeApiLoaded) {
            dispatch(searchForVideos(searchQuery));
        }
    }, [dispatch, getSearchQuery, youtubeApiLoaded])

    useEffect(() => {
        if (!getSearchQuery()) {
            props.history.push('/');
        }
        searching();
    }, [getSearchQuery, props.history, searching]);

    useEffect(() => {
        if (youtubeApiLoaded) {
            searching();
        }
    }, [searching, youtubeApiLoaded]);

    function bottomReachedCallback() {
        if (nextPageToken) {
            dispatch(searchForVideos(getSearchQuery(), nextPageToken, 25));
        }
    }

    return (
        <VideoList 
            bottomReachedCallback={bottomReachedCallback}
            showLoader={true}
            videos={searchResults}/>
    );
}

export default withRouter(Search);