import {
	LOGIN_SUCCESS,
	LOGIN_REQUEST,
	LOGIN_ERROR,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	LOGOUT,
	CONFIG,
} from '../constants.js';
import axios from 'axios';

export const loginAction = (formData) => async (dispatch) => {
	dispatch({
		type: LOGIN_REQUEST,
	});
	const { email, password } = formData;
	console.log(email, password);
	try {
		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/user/login`,
			{ email, password },
			CONFIG
		);
		console.log(data);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		console.log(error);
		dispatch({
			type: LOGIN_ERROR,
			payload: error,
		});
	}
};

export const register = (formData) => async (dispatch) => {
	const { name, email, password } = formData;
	console.log(name, email, password);
	try {
		dispatch({
			type: REGISTER_REQUEST,
		});
		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/user`,
			{ name, email, password },
			CONFIG
		);
		console.log(data);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: REGISTER_ERROR,
			payload: error,
		});
	}
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem('userInfo');
	// axios.interceptors.request.handlers = [];
	// console.log(axios.interceptors.request.handlers);
	dispatch({
		type: LOGOUT,
	});
};
