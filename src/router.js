import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from "./routes/LoginPage";
import ErrorPage from "./routes/ErrorPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/error" component={ErrorPage} />
    </Router>
  );
}

export default RouterConfig;
