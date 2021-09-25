import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Layout from '@/layouts/Layout';
import Home from '@/views/Home';
import Login from '@/views/Login';
import OrdenDetail from '@/views/OrdenDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/ordenes" />
          </Route>
          <Route path="/ordenes" exact>
            <Home/ >
          </Route>
          <Route path="/ordenes/:ordenId">
            <OrdenDetail />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
