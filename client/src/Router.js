import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Editor from './components/pages/Editor';

const routing = (
  <Router>
    <div>
      <Route exact path="/" render={({history}) => {
        return(
            <App history />
        )
      }} />
    <Route path="/editor/:image" render={({history}) => {
        return (
          <Editor history/>
        )
      }} />
    </div>
  </Router>
)

export default routing;
