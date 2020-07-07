const express = require('express')
const app = express()
const port = 4000

const axios = require('axios');

let re = /<a href="\.\/rfc(?<rfcid>\d{4})/gm;

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/rfc', (req, res) => {



	axios.get('https://www.rfc-editor.org/rfc/rfc4255.html')
	.then(response => {
		let str = response.data.toString();

		let firstLevel = [];
		let match = re.exec(str);
		
		do {
			//console.log(`Hello ${match.groups.rfcid}`);
			firstLevel.push(match.groups.rfcid);
		} while((match = re.exec(str)) !== null);	
		console.log(firstLevel);
		res.send(firstLevel);
	})
	.catch(error => {
		console.log(error);
	});

});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))