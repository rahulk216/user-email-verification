import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Pages
import HomeScreen from './Pages/HomeScreen/HomeScreen';
import LoginScreen from './Pages/LoginScreen/LoginScreen';
import RegisterScreen from './Pages/RegisterScreen/RegisterScreen';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route exact path='/' element={<HomeScreen />} />
					<Route exact path='/login' element={<LoginScreen />} />
					<Route exact path='/register' element={<RegisterScreen />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
