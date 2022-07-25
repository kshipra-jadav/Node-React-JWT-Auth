const bc = require('bcrypt')
const fs = require('fs')
const sr = 10
async function main() {
	fs.readFile('userData.json', 'utf-8', (err, data) => {
		const fileContents = JSON.parse(data)
		const username = 'kshipra'
		const password = '1234'
		const usr = fileContents.filter(async (item) => {
			const pass = await bc.compare(password, item.password)
			const uname = item.username === username
			console.log(pass && uname)
			return (pass && uname)
		})
		const lol = fileContents.filter(item => (item.username === username && bc.compareSync(password, item.password)))
		console.log(lol)
		// console.log(usr)
	})
}
main()