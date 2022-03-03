import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {
	return (
		<div className='App'>
			<Router>
				<div className='App-header'>
					<Route path='/' exact>
						<HomePage />
					</Route>
					<Route path='/add-movie'>
						<AddExercisePage />
					</Route>
					<Route path='/edit-movie'>
						<EditExercisePage />
					</Route>
				</div>
			</Router>
		</div>
	);
}

export default App;
