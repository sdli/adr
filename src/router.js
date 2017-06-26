import React from 'react';
import { Router, Route,IndexRoute} from 'dva/router';
import IndexPage from './routes/IndexPage';
import LoginPage from "./routes/LoginPage";
import ErrorPage from "./routes/ErrorPage";
import Contents from "./components/content/";
import CountryContent from "./routes/CountryPage";
import IndexContent from "./routes/IndexContentPage";
import DetailsContent from "./routes/DetailsPage";
import AreaContent from "./routes/AreaContentPage";
import CityContent from "./routes/CityContentPage";
import SearchContent from "./routes/SearchContent";
import CheckCity from "./routes/CheckCityContent";
import CheckArea from "./routes/CheckAreaContent";
import CheckData from "./routes/CheckDataContent";
import CheckCountry from "./routes/CheckCountryContent";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Router path="/" component={IndexPage}>
         <Route path ="/city/:id" component={CityContent} />
         <Route path ="/area/:id" component={AreaContent} />
         <Route path ="/data/:id" component={IndexContent} />
         <Route path ="/country/:id" component={CountryContent} />
         <Route path ="/details/:id" component={DetailsContent} />
         <Route path ="/search" component={SearchContent} />   
         <Route path ="/checkCity/:id" component={CheckCity} />
         <Route path ="/checkArea/:id" component={CheckArea} />
         <Route path ="/checkData/:id" component={CheckData} />
         <Route path ="/checkCountry/:id" component={CheckCountry} />
      </Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/error" component={ErrorPage} />
    </Router>
  );
}

export default RouterConfig;