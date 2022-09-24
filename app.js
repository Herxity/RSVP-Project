//Express is your framework
const express = require('express');
//Joi is our input validator
const Joi = require('joi')
const app = express();
const fs = require('fs')
const morgan = require('morgan')
const mongoose = require('mongoose')

//Database link to MongoD B
const dbURI = 'mongodb+srv://NodeJsAPI:cE8RtsZuCiJugI4x@cluster0.blwrvz9.mongodb.net/NodeTutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true}).then((result)=>)


app.use(express.json());

// register view engine

//Array of Courses
const guests = [
    {name:"Michael Jackson", attending:"No"},
    {name:"Ronald McDonald", attending:"Yes"},
    {name:"Elvis Presley", attending:"No"},
    {name:"Elmo", attending:"No"},
]

//To learn about all the properties you can use, read the EXPRESS docs
app.use(morgan('dev'))

//Looks for the 'views' folder by default
app.set('view engine','ejs');

//Enables Client Input to be Listened To
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening on Port ${port}...`)
    
})

//GET endpoints

//HANDLES FIRST PAGE
app.get('/',(req,res)=>{
    //HANDLES MAIN PAGE
    //Make sure dependencies list 'ejs' as dependency else this may throw error when running
    res.render('index',{ title: 'Home'})
})

//HANDLES RSVP

app.get('/rsvp',(req,res)=>{
    
    res.render('rsvp',{ title: 'RSVP Form',guests})
})

//Handles all other pages
app.get('/:page',(req,res)=>{

    let path = ""
    //DIRECTS USER AROUND
    switch(req.params.page){
        case 'about':
            res.render('about',{ title: 'About'})
            break
        case 'about-me':
            res.render('about',{ title: 'About'})
            break
        default:
            res.render('404')
            break
    }
})
