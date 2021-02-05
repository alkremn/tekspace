import React from 'react';
import '../styles/app.scss';

//router
import { Route, Switch } from 'react-router-dom';

//components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Switch>
        <h1>Hello new App</h1>
      </Switch>
    </div>
  );
}

export default App;
