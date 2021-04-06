import React, {useEffect} from 'react';
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

    useEffect(() => {
        console.log('first useEffect')
        if (!getSearchQuery()) {
            props.history.push('/');
        }
        searching();
    }, []);

    useEffect(() => {
        console.log('seconde useEffect: ', youtubeApiLoaded)
        if (youtubeApiLoaded) {
            searching();
        }
    }, [youtubeApiLoaded]);

    function getSearchQuery() {
        return getSearchParam(props.location, 'search_query');
    }

    function searching() {
        const searchQuery = getSearchQuery();
        if (youtubeApiLoaded) {
            console.log('searchForVideos', searchQuery);
            dispatch(searchForVideos(searchQuery));
        }
    }

    function bottomReachedCallback() {
        console.log('nextPageToken: ', nextPageToken)
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