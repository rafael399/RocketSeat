import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact componente={SignIn} />
      <Route path="/register" componente={SignUp} />
      <Route path="/dashboard" componente={Dashboard} />
      <Route path="/profile" componente={Profile} />
    </Switch>
  );
}
