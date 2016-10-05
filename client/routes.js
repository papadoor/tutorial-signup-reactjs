import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Getstart from './components/layout/Getstart';
import SignupPage from './components/signup/SignupPage';



export default (
    <Route path="/" component={App} >
      <IndexRoute component={Getstart} />
      <Route path="signup" component={SignupPage} />
    </Route>
)