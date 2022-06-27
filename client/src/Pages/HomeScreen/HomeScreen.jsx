import React, { useState, useEffect } from 'react';
import { navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { logout } from '../../actions/userActions';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const handleLogout = () => {
		dispatch(logout());
	};

	useEffect(() => {
		//console.log(userInfo);
		if (!userInfo) {
			navigate('/login');
		}
	}, [userInfo]);
	return (
		<div>
			HomeScreen
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default HomeScreen;
