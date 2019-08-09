const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)

// console.log(path.join(__dirname, '../public'))
const app = express()

//Define Paths for express config and view locations
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")


//setup handlebars engine and
app.set('views', viewsPath)
app.set('view engine', 'hbs') //setting name, value we want to set for setting
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Rei"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Page",
        name: "Rei"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: "I've fallen and I can't get up!",
        title: "Help Page",
        name: "Rei"
    })
})

//app.com
// app.get('', (req, res)=>{
//     res.send('<h1>Weather</h1>')
// })

//app.com/help
// app.use(express.static(publicDirectoryPath + '/help.html'))
// app.get('/help', (req, res)=> {
//     res.send(express.static(publicDirectoryPath))
// })

// //app.com/about
// app.get('/about', (req,res)=>{
//     res.send('<h1>Abuout</h1>')
// })

app.get('/weather', (req,res)=> {
    if(!req.query.address){
        return res.send({
            error: "Address must be provided"
        })
    }

    geocode(req.query.address, (error,{longitude, latitude, location} = {}) => {
        if(error){
          return res.send({
              error: error
          })
        }
        console.log('Error', error)
        // console.log('Data', data)
        // const {longitude, latitude, location} = data
        forecast(longitude, latitude, (error, forecaseData) => {
          if(error){
            return res.send({
                error: error
            })
          }
          // console.log('Error', error)
          // console.log('Data', data)
          console.log(location)
          console.log(forecaseData)
            res.send({
                forecast: forecaseData,
                location: location,
                address: req.query.address
            })
        })
      })

    // res.send({
    //     // forecast: "random",
    //     // location: 'New York'
    //     address: req.query.address
    // })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    // res.send('Help article not found')
    res.render('404', {
        title: 404,
        name: "Rei",
        errorMessage: "Help not found."
    })
})

app.get('*', (req,res)=> {
    // res.send('My 404 page')
    res.render('404', {
        title: 404,
        name: "404",
        errorMessage: "Page not found."
    })
})

//starts server
app.listen(3000, () => {
    console.log('Server started')
})