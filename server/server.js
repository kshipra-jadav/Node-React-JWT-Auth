require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cors = require('cors')
const bc = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 8000
const saltRounds = 10

app.listen(PORT, () => {
	console.log('Listening on PORT 8000')
})

app.post('/signup', async (req, res) => {
	const username = req.body.username
	const email = req.body.email
	const password = await bc.hash(req.body.password, saltRounds)

	const user = { username, password, email }

	await fs.readFile('userData.json', 'utf-8', async (err, data) => {
		if (err) return console.log(err)
		const fileContents = JSON.parse(data)
		fileContents.push(user)
		await fs.writeFile('userData.json', JSON.stringify(fileContents), (err) => {
			if (err) return console.log(err)
		})
	})

	res.status(401).send('User Created Successfully')
})

app.post('/signin', async (req, res) => {
	let userFound = false
	const username = req.body.username
	const password = req.body.password

	await fs.readFile('userData.json', 'utf-8', (err, data) => {
		if (err) return res.send('Unable to read user file').status(500)

		const fileContents = JSON.parse(data)

		const user = fileContents.filter(item => (item.username === username && bc.compareSync(password, item.password)))
		if (user.length !== 0) {
			console.log('correct usr')
			const accessToken = jwt.sign(user[0], process.env.ACCESS_TOKEN)
			return res.status(200).json({ accessToken, 'user': user[0] })
		} else {
			return res.status(401).send('User Not Found')
		}
	})
})

app.get('/protected', authorize, (req, res) => {
	res.status(200).json(req.user)
})

function authorize (req, res, next) {
	const token = req.headers['authorization']
	if (token === null) return res.status(401).send('No Token Given')
	jwt.verify(JSON.parse(token), process.env.ACCESS_TOKEN, (err, user) => {
		if (err) return res.status(403).send('Incorrect Access Token')
		req.user = user
		next()
	})
}

