import './App.css'
import { useState } from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import axios from 'axios'

function App () {
	const [loggedIn, setLoggedIn] = useState('')
	const [creds, setCreds] = useState({})
	const handleCreds = () => {
		const accessToken = JSON.parse(localStorage.getItem('accessToken'))
		const user = JSON.parse(localStorage.getItem('user'))
		if (accessToken && user) setCreds({ accessToken, user })
	}
	const handleSignOut = () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('user')
		setLoggedIn('')
		setCreds({})
	}
	const handleProtectedRoute = async () => {
		try {
			const { data } = await axios.get('http://localhost:8000/protected', {
				headers: {
					'authorization': localStorage.getItem('accessToken')
				}
			})
			window.alert(`You have correct credentials for accessing this route! Your credentials are :- \n ${JSON.stringify(data, null, 2)}`)
		}
		catch(e) {
			window.alert('You must be signed in to view protected route!')
		}
	}
	return (
			<>
				{
						loggedIn && <h1 className={ 'top' }>Logged In As :- { loggedIn } </h1>
				}
				<SignIn setLoggedIn={ setLoggedIn }/>
				<hr/>
				<hr/>
				<SignUp/>
				<hr/>
				<hr/>
				<div style={ {
					'display': 'flex',
					'alignItems': 'center',
					'justifyContent': 'center',
					'flexDirection': 'column',
					'gap': '10px'
				} }>
					<button style={ { 'height': '50px', 'width': '400px' } }
							onClick={ handleCreds }
					>
						View Credentials (Will only work if you're signed in!)
					</button>
					<br/><br/>
					{
							Object.keys(creds).length !== 0 &&
							<div style={ { width: '500px', wordWrap: 'break-word' } }>

								Access Token - { creds.accessToken }
								<br/><br/>
								Username - { creds.user.username }
								<br/><br/>
								Password - { creds.user.password }
								<br/><br/>
								Email - { creds.user.email }

							</div>
					}
				</div>
				<hr/>
				<hr/>
				<div style={ {
					display: 'flex',
					flexDirection: 'row',
					height: '100px',
					gap: '20px',
					alignItems: 'center',
					justifyContent: 'center'
				} }>
					<button style={ { 'height': '50px', 'width': '400px' } } onClick={ handleSignOut }>Sign Out</button>
					<button style={ { 'height': '50px', 'width': '400px' } } onClick={ handleProtectedRoute }>Access
						Protected API route
					</button>
				</div>
			</>
	)
}

export default App
