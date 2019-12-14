import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '~/routes/Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import NewStudent from '~/pages/NewStudent';
import EditStudent from '~/pages/EditStudent';

import Plans from '~/pages/Plans';
import NewPlan from '~/pages/NewPlan';
import EditPlan from '~/pages/EditPlan';

import Registrations from '~/pages/Registrations';
import NewRegistration from '~/pages/NewRegistration';
import EditRegistration from '~/pages/EditRegistration';

import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={Students} isPrivate />
      <Route path="/newStudent" component={NewStudent} isPrivate />
      <Route path="/editStudent" component={EditStudent} isPrivate />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/newPlan" component={NewPlan} isPrivate />
      <Route path="/editPlan" component={EditPlan} isPrivate />

      <Route path="/registration" component={Registrations} isPrivate />
      <Route path="/newRegistration" component={NewRegistration} isPrivate />
      <Route path="/editRegistration" component={EditRegistration} isPrivate />

      <Route path="/help" component={HelpOrders} isPrivate />

      <Route path="/" component={SignIn} />
    </Switch>
  );
}
