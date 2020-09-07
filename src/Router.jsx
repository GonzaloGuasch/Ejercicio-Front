import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App';
import Genes from './Genes'
import Variants from './Variants'
import Diseases from './Diseases'


export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route exact path='/genes' component={Genes} />
          <Route exact path='/variant'  component={Variants}/>
          <Route exact path='/disease'  component={Diseases}/>
        </Switch>
      </BrowserRouter>
    );
  }
}