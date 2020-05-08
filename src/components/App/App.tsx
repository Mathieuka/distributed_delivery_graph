import React, { FC, useState } from 'react';
import './App.css';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBandwidth_Action } from '../../redux/actions/data_action';
import { convertHumanDateToUnixTimestamp } from '../../helper/dateConverter';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

interface IApp {
  tokenSession: string;
  getBandwidth_Action: any;
}

const App: FC<IApp> = ({ tokenSession, getBandwidth_Action }) => {

  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth && tokenSession) {
    setIsAuth(true);
    getBandwidth_Action(tokenSession, convertHumanDateToUnixTimestamp({ year: 2020, month: 4, day: 22 }, { year: 2020, month: 4, day: 24 }))
  }

  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard isAuth={isAuth} />
        </Route>
      </Router>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    tokenSession: state.authReducer.tokenSession,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    getBandwidth_Action
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
