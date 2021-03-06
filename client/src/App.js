import React, { useState, useEffect } from 'react';
import './styles/app.scss';
// Router
import { Redirect, Route, Switch } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { fetchUsersAction } from './actions/userActions';
import { fetchMessagesAction } from './actions/messageActions';
import { fetchSolutionsAction } from './actions/solutionActions';
import { fetchCasesAction } from './actions/caseActions';
import { addConnectedUsersAction } from './actions/userActions';
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
// Socket.io
import socket from './utils/socket';
import { withRouter } from 'react-router-dom';
import { fetchReportAction } from './actions/reportActions';

function App({ history }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('Overview');
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchReportAction());
      dispatch(fetchUsersAction());
      dispatch(fetchSolutionsAction());
      dispatch(fetchCasesAction());
      dispatch(fetchMessagesAction());
    };
    if (!user) {
      history.push('/login');
    } else {
      socket.auth = { token: user.token };
      socket.connect();
      fetchData();
      socket.on('users', users => {
        dispatch(addConnectedUsersAction(users));
      });
    }
    return () => socket.disconnect();
  }, [user, dispatch, history]);

  return (
    <div className='app'>
      {!user ? (
        <LoginPage />
      ) : (
        <div className='content'>
          <Navbar setTitle={setTitle} />
          <Header title={title} />
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

export default withRouter(App);
