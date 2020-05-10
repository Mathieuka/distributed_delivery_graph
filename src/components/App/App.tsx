import React, { FC, useState } from 'react';
import './App.css';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

interface IApp {
	tokenSession: string;
}

const App: FC<IApp> = ({
	tokenSession,
}) => {
	
	const [isAuth, setIsAuth] = useState(false);

	if (!isAuth && tokenSession) {
		setIsAuth(true);
	}

	return (
		<div className="App">
			<Router>
				<Route path="/" exact>
					<Login />
				</Route>
				<Route path="/dashboard" exact>
					<Dashboard
						isAuth={isAuth}
						tokenSession={tokenSession}
					/>
				</Route>
			</Router>
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		tokenSession: state.authReducer.tokenSession,
	};
};

export default connect(mapStateToProps)(App);
