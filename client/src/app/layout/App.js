import React from 'react';
import '../../styles/app.scss';

// Router
import { Route, Switch } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar';
import Header from '../components/Header';

// Pages
import DashboardPage from '../pages/DashboardPage';
import TeamPage from '../pages/TeamPage';
import SolutionsPage from '../pages/SolutionsPage';
import SecondPage from '../pages/SecondPage';
import ChatPage from '../pages/ChatPage';
import SettingsPage from '../pages/SettingsPage';
import SolutionPage from '../pages/SolutionPage';

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Header />
      <Switch>
        <Route path='/dashboard' component={DashboardPage} />
        <Route
          path={['/createSolution', '/manageSolution/:id']}
          component={SolutionPage}
        />
        <Route path='/team' component={TeamPage} />
        <Route path='/solutions' component={SolutionsPage} />
        <Route path='/second' component={SecondPage} />
        <Route path='/chat' component={ChatPage} />
        <Route path='/settings' component={SettingsPage} />
      </Switch>
    </div>
  );
}

export default App;
