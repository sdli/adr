import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from "./routes/LoginPage";
import ErrorPage from "./routes/ErrorPage";
import Contents from "./components/content/";
import CountryContent from "./routes/CountryPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Router path="/" component={IndexPage}>
          <IndexRoute component={Contents.indexContent} />
          <Route path="/country/:id" component={CountryContent} />
          <Route path="/details/:id" component={Contents.detailsContent} />
      </Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/error" component={ErrorPage} />
    </Router>
  );
}

export default RouterConfig;
