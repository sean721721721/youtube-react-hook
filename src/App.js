import React, {Component, useEffect} from 'react';
import Home from './containers/Home/Home';
import AppLayout from './components/AppLayout/AppLayout';
import {Route, Switch, withRouter} from 'react-router-dom';
import Watch from './containers/Watch/Watch';
import Trending from './containers/Trending/Trending';
import Search from './containers/Search/Search';
import {bindActionCreators} from 'redux';
import {connect, useDispatch} from 'react-redux';
import {youtubeLibraryLoaded} from './store/actions/api';
import {key} from './config';


const API_KEY = key;

const App = (props) => {
    const { history, location } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        loadYoutubeApi();
    }, [])

    function loadYoutubeApi() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
    
        script.onload = () => {
            window.gapi.load('client', () => {
                window.gapi.client.setApiKey(API_KEY);
                window.gapi.client.load('youtube', 'v3', () => {
                    dispatch(youtubeLibraryLoaded());
                });
            });
        };
    
        document.body.appendChild(script);
    }
    return (
        <AppLayout>
            <Switch>
                <Route path="/feed/trending" component={Trending}/>
                <Route path="/results" render={() => <Search key={location.key}/>}/>
                <Route path="/watch" render={() => <Watch history={history} location={location} key={location.key}/>}/>
                <Route path="/" component={Home}/>
            </Switch>
        </AppLayout>
    )
}

export default withRouter(App);