
import 'materialize-css/dist/css/materialize.min.css'
import React, { Component } from 'react';
import Header from './Header'
import Landing from './Landing'
import { connect } from 'react-redux';
import * as actions from '../actions'
import {
  Route, Switch, BrowserRouter
} from "react-router-dom";

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path='/' component={Landing}></Route>
            <Route path='/survey' component={Dashboard}></Route>
          </div>
        </BrowserRouter>
      </div>
    )
  }

}

export default connect(null, actions)(App);