import React, {useEffect} from 'react';
import AppLayout from './components/AppLayout/AppLayout';
import Home from './containers/Home/Home';
import {Route, Switch, withRouter} from 'react-router-dom';
import Watch from './containers/Watch/Watch';
import {bindActionCreators} from 'redux';
import { useDispatch } from 'react-redux';
import {youtubeLibraryLoaded} from './store/actions/api';

const API_KEY = 'THIS_MY_API_KEY';

const App = () => {

  // const dispatch = useDispatch();
  // dispatch({youtubeLibraryLoaded});
  useEffect(() => {
    console.log('effect');
    function loadYoutubeApi() {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/client.js";
  
      script.onload = () => {
        window.gapi.load('client', () => {
          window.gapi.client.setApiKey(API_KEY);
          window.gapi.client.load('youtube', 'v3', () => {
            youtubeLibraryLoaded();
          });
        });
      };
      
      document.body.appendChild(script);
    }

    loadYoutubeApi();
  })
  return (
    <AppLayout>
      <Switch>
        <Route path="/watch" component={Watch}/>
        <Route path="/" component={Home}/>
      </Switch>
    </AppLayout>
  )
}

export default App;
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({youtubeLibraryLoaded}, dispatch);
// }

// export default withRouter(connect(null, mapDispatchToProps)(App));