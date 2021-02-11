import React, { useState } from 'react';
import './styles/app.scss';
// Router
import { Redirect, Route, Switch } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
// Components
import Navbar from './app/components/common/Navbar';
import Header from './app/components/common/Header';
// Pages
import LoginPage from './app/pages/LoginPage';
import OverviewPage from './app/pages/OverviewPage';
import TeamPage from './app/pages/TeamPage';
import SolutionsPage from './app/pages/SolutionsPage';
import SecondPage from './app/pages/SecondPage';
import MessagesPage from './app/pages/MessagesPage';
import SettingsPage from './app/pages/SettingsPage';

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <div className='app'>
      {!user ? (
        <LoginPage />
      ) : (
        <div className='content'>
          <Navbar />
          <Header />
          <Switch>
            <Route exact path='/'>
              <Redirect to='/overview' />
            </Route>
            <Route exact path='/overview' component={OverviewPage} />
            <Route path='/team' component={TeamPage} />
            <Route path='/solutions' component={SolutionsPage} />
            <Route path='/second' component={SecondPage} />
            <Route path='/messages' component={MessagesPage} />
            <Route path='/settings' component={SettingsPage} />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
