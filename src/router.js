import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from "./routes/LoginPage";
import ErrorPage from "./routes/ErrorPage";
import Contents from "./components/content/";
import CountryContent from "./routes/CountryPage";
import IndexContent from "./routes/IndexContentPage";
import DetailsContent from "./routes/DetailsPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Router path="/" />
      <Router path="/data/:id" component={IndexPage}>
          <IndexRoute component={IndexContent} />
      </Router>
      <Router path="/country/:id" component={IndexPage}>
          <IndexRoute component={CountryContent} />
      </Router>
      <Router path="/details/:id" component={IndexPage}>
          <IndexRoute component={DetailsContent} />
      </Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/error" component={ErrorPage} />
    </Router>
  );
}

export default RouterConfig;
