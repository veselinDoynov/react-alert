import React from 'react';
// react router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// pages
import Home from './Home';
import About from './About';
import Alerts from './Alerts';
import Error from './Error';

// navbar
import Navbar from './Navbar';
import Alert from "./Alert";
const ReactRouterSetup = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/alerts'>
          <Alerts />
        </Route>
        <Route path='/alert/:id/:currentOffset' children={<Alert />}></Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
