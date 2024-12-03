const express = require('express')
const axios = require('axios')
const path = require('path')
require('dotenv').config()

const app = express()

// API_KEY='http://api.openweathermap.org/data/2.5/weather' Replace this in your .env
const API = process.env.API_KEY
const PORT = process.env.PORT

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.render('index.ejs')
})

app.post('/weather', (req, res) => {
	axios({
		method: 'get',
		url: `${API}?q=${req.body['zip']}&appid=89fa33807d3cd9fca161c65cfc278a4e`,
	})
		.then((response) => {
			console.log(response)
			res.render('weather/show.ejs', { data: response.data })
		})
		.catch((err) => {
			console.log(err)
		})
})

app.listen(PORT, () => {
	console.log(`Running on localhost:${PORT}`)
})
