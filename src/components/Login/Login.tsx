import React, { FC, useState, useEffect } from 'react';
import './Login.css';
import { logInAction } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface ILogin {
	logInAction: any;
	tokenSession: string;
}

const Login: FC<ILogin> = ({ logInAction, tokenSession }) => {
	const history = useHistory();
	useEffect(() => {
		if (tokenSession) {
			history.push('/dashboard');
		}
	}, [tokenSession]);

	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');

	const submitLogin = (e: React.MouseEvent): void => {
		e.preventDefault();
		logInAction(identifier, password);
	};

	return (
		<div className='loginScreen'>
			<div className='formContainer'>
				<form className="form">
					<div className="formInput">
						<input
							type="text"
							placeholder={'Identifier'}
							value={identifier}
							onChange={(e) => setIdentifier(e.target.value)}
						/>
						<input
							type="password"
							placeholder={'Password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button className="loginButton" onClick={(e) => submitLogin(e)}>
						Valid
				</button>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		tokenSession: state.authReducer.tokenSession,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			logInAction,
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
