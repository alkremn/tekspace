import React, { useState } from 'react';
import './styles/app.scss';

// Router
import { Redirect, Route, Switch } from 'react-router-dom';

// Components
import Navbar from './app/components/common/Navbar';
import Header from './app/components/common/Header';

// Pages
import LoginPage from './app/pages/LoginPage';
import DashboardPage from './app/pages/DashboardPage';
import TeamPage from './app/pages/TeamPage';
import SolutionsPage from './app/pages/SolutionsPage';
import SecondPage from './app/pages/SecondPage';
import ChatPage from './app/pages/ChatPage';
import SettingsPage from './app/pages/SettingsPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className='app'>
      {user ? (
        <LoginPage />
      ) : (
        <div className='content'>
          <Navbar />
          <Header />
          <Switch>
            <Route exact path={['/', '/dashboard']} component={DashboardPage} />
            <Route path='/team' component={TeamPage} />
            <Route path='/solutions' component={SolutionsPage} />
            <Route path='/second' component={SecondPage} />
            <Route path='/chat' component={ChatPage} />
            <Route path='/settings' component={SettingsPage} />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
