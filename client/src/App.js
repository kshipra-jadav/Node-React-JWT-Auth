import './App.css'
import { useState } from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

function App () {
	const obj = {
		'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhYWZkYWFqYWxlYmlpIiwicGFzc3dvcmQiOiJrc2hpcHJhMTIzIiwiZW1haWwiOiJrc2hpcHJhamFkYXZAaG90bWFpbC5jb20iLCJpYXQiOjE2NTg2ODg4MjV9.OR2UZ2UTm8ycgAdxLlwNnBkQr-nRAZeVg1SjibPFTcU',
		'user': {
			'username': 'faafdaajalebii',
			'password': 'kshipra123',
			'email': 'kshiprajadav@hotmail.com'
		}
	}
	const [loggedIn, setLoggedIn] = useState('')
	const [creds, setCreds] = useState({})
	const handleCreds = () => {
		const accessToken = JSON.parse(localStorage.getItem("accessToken"))
		const user = JSON.parse(localStorage.getItem("user"))
		setCreds({accessToken, user})
	}
	return (
			<>
				{
						loggedIn && <div className={ 'top' }>Logged In As :- { loggedIn } </div>
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
					'gap': "10px"
				} }>
					<button style={ { 'height': '50px', 'width': '400px' } }
							onClick={ handleCreds }
					>
						View Credentials (Will only work if you're signed in!
					</button>
					<br/><br/>
					{
						Object.keys(creds).length!==0 && <div style={{width: "500px", height: "500px", wordWrap: "break-word"}}>

						Access Token - {creds.accessToken}
						<br/><br/>
						Username - {creds.user.username}
						<br/><br/>
						Password - {creds.user.password}
						<br/><br/>
						Email - {creds.user.email}

					</div>
					}
				</div>
			</>
	)
}

export default App
