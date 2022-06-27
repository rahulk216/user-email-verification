import React, { useState, useEffect } from 'react';
import { navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../../actions/userActions';

const RegisterScreen = () => {
	const dispatch = useDispatch();
	const registerCheck = useSelector((state) => state.registerStatus);
	console.log(registerCheck);
	const { registerUser, loading } = registerCheck;
	// const { register: registerStatus } = registerCheck;
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	console.log(formData);

	const registerHandler = async (e) => {
		e.preventDefault();
		await dispatch(register(formData));
	};

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	//console.log(register);
	useEffect(() => {}, []);
	return (
		<div>
			<div className='registercontainer'>
				<form onSubmit={(e) => registerHandler(e)}>
					<input
						type='text'
						placeholder='name'
						name='name'
						onChange={onChange}
					/>
					<input
						type='text'
						placeholder='email'
						name='email'
						onChange={onChange}
					/>
					<input
						type='text'
						placeholder='password'
						name='password'
						onChange={onChange}
					/>
					<input type='submit' value='Register User' />
				</form>
				{registerUser ? <div>{registerUser?.message}</div> : <div></div>}
			</div>
		</div>
	);
};

export default RegisterScreen;
