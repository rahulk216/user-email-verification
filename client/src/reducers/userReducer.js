import {
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGIN_REQUEST,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	LOGOUT,
} from '../constants';

export const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { loading: true };
		case LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case LOGIN_ERROR:
			return { loading: false, error: action.payload };
		case LOGOUT:
			return {};
		default:
			return state;
	}
};

export const registerReducer = (state = {}, action) => {
	switch (action.type) {
		case REGISTER_REQUEST:
			return { loading: true };
		case REGISTER_SUCCESS:
			return { loading: false, success: true, registerUser: action.payload };
		case REGISTER_ERROR:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
