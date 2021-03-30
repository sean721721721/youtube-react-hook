import React from 'react';
import HeaderNav from './containers/HeaderNav/HeaderNav';
import SideBar from './containers/SideBar/SideBar';
import AppLayout from './components/AppLayout/AppLayout';
import Home from './containers/Home/Home';

const App = () => {
  return (
    <AppLayout>
      <Home/>
    </AppLayout>
  )
}

export default App;
