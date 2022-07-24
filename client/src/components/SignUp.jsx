import axios from 'axios'


const SignUp = () => {
	const handleSubmit = async (e) => {
		e.preventDefault()
		const username = e.target[0].value
		const email = e.target[1].value
		const password = e.target[2].value
		e.target.reset()
		const response = await axios.post('http://localhost:8000/signup', { username, email, password })
		console.log(response)
	}
	return (<>
		<form action="#" onSubmit={ handleSubmit }>
			<div className="signup-container" style={ {
				'display': 'flex',
				'flexDirection': 'column',
				'gap': '5px',
				'alignItems': 'center',
				'justifyContent': 'center',
				'marginTop': '30px'
			} }>
				<input type={ 'text' }
					   className={ 'username-signup' }
					   placeholder={ 'UserName' }
					   style={ {
						   'height': '30px', 'width': '300px'
					   } }
				/>
				<br/>
				<input type={ 'text' }
					   className={ 'email-signup' }
					   placeholder={ 'Email' }
					   style={ {
						   'height': '30px', 'width': '300px'
					   } }
				/>
				<br/>
				<input type={ 'password' }
					   className={ 'password-signup' }
					   placeholder={ 'Password' }
					   style={ {
						   'height': '30px', 'width': '300px'
					   } }
				/>
				<br/>
				<button
						style={ {
							'height': '40px', 'width': '200px'
						} }
						type="submit"
				>
					Sign Up
				</button>
			</div>
		</form>
	</>)
}

export default SignUp
