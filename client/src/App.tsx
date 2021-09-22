import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from '@/layouts/Layout';
import Home from '@/views/Home';
import Login from './views/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
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
