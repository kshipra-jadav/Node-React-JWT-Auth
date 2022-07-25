import axios from 'axios'

const SignIn = ({setLoggedIn}) => {
	const handleSubmit = async (e) => {
		e.preventDefault()
		const username = e.target[0].value
		const password = e.target[1].value
		e.target.reset()
		try {
			const { data } = await axios.post('http://localhost:8000/signin', {username, password})
			setLoggedIn(data.user.username)
			localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
			localStorage.setItem('user', JSON.stringify(data.user))
		}
		catch(e) {
		window.alert('Wrong Username or Password!')

		}



	}
	return (<>
		<form action="#" onSubmit={handleSubmit}>
			<div className="signin-container" style={ {
				'display': 'flex',
				'flexDirection': 'column',
				'gap': '5px',
				'alignItems': 'center',
				'justifyContent': 'center',
				'marginTop': '30px'
			} }>
				<input type={ 'text' }
					   className={ 'username-signin' }
					   placeholder={ 'UserName' }
					   style={ {
						   'height': '30px', 'width': '300px'
					   } }
				/>
				<br/>

				<input type={ 'password' }
					   className={ 'password-signin' }
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
						type={"submit"}
				>
						Sign In
				</button>
			</div>
		</form>
	</>)
}

export default SignIn
