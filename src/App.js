import React, {useState} from 'react';
import './App.css';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';

// validation
const validate = ({name, email, password, termsOfService}) => {
	const errors = {};
	
	// validating name
	if (!name) {
		errors.name = '*Please enter your name';
	} else if (name.length < 2) {
		errors.name= '*Your name must have two characters or more';
	};

	// validating email
	if (!email) {
		errors.email = '*Please enter your email';
	} else if (email === 'waffle@syrup.com') {
		errors.email = '*You are banned from this site';
	};

	// validating password, how would you go about checking to see if it has a number... no idea what this is doing but it works
	if (!password) {
		errors.password = '*Please enter a password';
	} else if (/\d/.test(password) === false) {
		errors.password = '*Your password must contain a number';
	};

	// validating terms of service
	if (termsOfService === false) {
		errors.termsOfService = '*You must accept the Terms of Service';
		console.log(errors.termsOfService);
	};

	return errors;
};

function App() {
	const [message, setMessage] = useState('');
	
	return (
		<div className='App'>
			<h1>Sign Up</h1>
			
			{/* setting initial values to be empty and naming all inputs that will be used */}
			<div className='form-container'>
				<Formik
					initialValues = {{
						name: '',
						email: '',
						password: '',
						termsOfService: false
					}}

					onSubmit = {(values, tools) => {
						axios.post('https://reqres.in/api/users', values)
							.then(response => {
								setMessage([...message, response.data]);
								tools.resetForm();
							})
							.catch(error => {
								console.log(error);
							})
					}}

					validate = {validate}

					render = {() => {
						return (
							<Form autoComplete='off'>
								<Field name='name' type='text' placeholder='Name'/>
								<ErrorMessage name='name' component='div' className='error'/>

								<Field name='email' type='email' placeholder='Email'/>
								<ErrorMessage name='email' component='div' className='error'/>

								<Field name='password' type='password' placeholder='Password' minLength='8'/>
								<ErrorMessage name='password' component='div' className='error'/>
								
								<div className='checkbox-container'>
									<Field name='termsOfService' type='checkbox'/>
									<label htmlFor='termOfService'>I agree to the Terms of Service</label>
									<ErrorMessage name='termsOfService' component='div' className='error'/>
								</div>
								
								<input type='submit'/>
							</Form>
						)
					}}
				/>
			</div>
			
			<p className='forgot-password'>Forgot your password?</p>
			
			

			{message && message.map(iteration => (
				<div className='card' key={iteration.id}>
					<h3>{iteration.name}</h3>
					<p>{iteration.email}</p>
					<p>{iteration.password}</p>
					<p>{String(iteration.termsOfService)}</p>
				</div>
			))}
			
		</div>
	);
}

export default App;