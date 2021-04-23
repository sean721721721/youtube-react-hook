import React from 'react';
import Home from './containers/Home/Home';
import AppLayout from './components/AppLayout/AppLayout';
import {Route, Switch, withRouter} from 'react-router-dom';
import Watch from './containers/Watch/Watch';
import Trending from './containers/Trending/Trending';
import Search from './containers/Search/Search';
import {key} from './config';
import History from './containers/History/History';
import useLoadYoutubeApi from './useLoadYoutubeApi';


const API_KEY = key;

const App = (props) => {
    const { history, location } = props;
    useLoadYoutubeApi(API_KEY);
    return (
        <AppLayout>
            <Switch>
                <Route path="/feed/history" component={History}/>
                <Route path="/feed/trending" component={Trending}/>
                <Route path="/results" render={() => <Search key={location.key}/>}/>
                <Route path="/watch" render={() => <Watch history={history} location={location} key={location.key}/>}/>
                <Route path="/" component={Home}/>
            </Switch>
        </AppLayout>
    )
}

export default withRouter(App);