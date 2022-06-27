import React, { useState, useEffect } from 'react';
import './LoginScreen.css';
import { Link } from 'react-router-dom';
import { loginAction } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
	//Assign to fxn
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [errorHandler, seterrorHandler] = useState('');
	console.log(errorHandler);

	const redirect = location.search ? location.search.split('=')[1] : '/';

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo, error } = userLogin;

	console.log(error?.response);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const submitHandler = async (e) => {
		e.preventDefault();
		//console.log('submit');
		await dispatch(loginAction(formData));

		// if (error) {
		// 	seterrorHandler(error?.response?.data);
		// }
		//seterrorHandler('Invalid Creds or not verified');
	};

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		console.log(userInfo);
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, userInfo, redirect]);

	return (
		<div>
			<div className='loginContainer'>
				<form onSubmit={(e) => submitHandler(e)}>
					<input
						className='login-input'
						type='text'
						name='email'
						placeholder='Enter Email'
						onChange={(e) => onChange(e)}
					/>
					<input
						className='login-input'
						type='text'
						name='password'
						placeholder='Enter password'
						onChange={(e) => onChange(e)}
					/>
					<input className='login-submit' type='submit' value='Login' />
					<Link to='/register'>Create a new account</Link>
					{error ? (
						<div>
							<p>{error?.response?.data}</p>
						</div>
					) : (
						<div></div>
					)}
				</form>
			</div>
		</div>
	);
};

export default LoginScreen;
