import React from 'react';
import AppLayout from './components/AppLayout/AppLayout';
import Home from './containers/Home/Home';
import {Route, Switch} from 'react-router-dom';
import Watch from './containers/Watch/Watch';

const App = () => {
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
