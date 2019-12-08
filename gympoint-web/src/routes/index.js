import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '~/routes/Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import Plans from '~/pages/Plans';
import Registration from '~/pages/Registration';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/registration" component={Registration} isPrivate />
      <Route path="/help" component={HelpOrders} isPrivate />

      <Route path="/" component={SignIn} />
    </Switch>
  );
}