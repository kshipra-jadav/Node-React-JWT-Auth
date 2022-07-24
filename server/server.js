require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 8000

app.listen(PORT, () => {
	console.log('Listening on PORT 8000')
})

app.post('/signup', async (req, res) => {
	const username = req.body.username
	const email = req.body.email
	const password = req.body.password

	const user = { username, password, email }

	await fs.readFile('userData.json', 'utf-8', async (err, data) => {
		if (err) return console.log(err)
		const fileContents = JSON.parse(data)
		fileContents.push(user)
		await fs.writeFile('userData.json', JSON.stringify(fileContents), (err) => {
			if (err) return console.log(err)
		})
	})

	res.send('User Created Successfully').status(401)
})

app.post('/signin', async (req, res) => {
	let userFound = false
	const username = req.body.username
	const password = req.body.password
	await fs.readFile('userData.json', 'utf-8', (err, data) => {
		if (err) return res.send('Unable to read user file').status(500)
		const fileContents = JSON.parse(data)
		const user = fileContents.filter(item => (item.username === username && item.password === password))
		if(user.length !== 0) {
			const accessToken = jwt.sign(user[0], process.env.ACCESS_TOKEN)
			return res.json({ accessToken, "user": user[0] }).status(200)
		} else {
			return res.send("User Not Found").status(401)
		}
	})
})

function authorize (req, res, next) {
	const token = req.headers['authorization']
	if (token === null) return res.sendStatus(401)

	jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
		if (err) return res.sendStatus(403)
		req.user = user
		next()
	})
}

