//Express is your framework
const express = require('express');
//Joi is our input validator
const Joi = require('joi')
const app = express();
const fs = require('fs')
app.use(express.json());

// register view engine

//Array of Courses
const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},

]

//To learn about all the properties you can use, read the EXPRESS docs
/*
    The endpoints have what are called higher order functions within them, denoted by the Lambda expressions:
    (req,res) =>

    This is the functionality you pass in to the original GET,POST,DELETE, and other endpoints.

    'req' denotes the reqest stream, and is where you get input

    'res' denotes response strea, and is where you send output
*/

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
    res.render('index')
})

//HANDLES RSVP

app.get('/rsvp',(req,res)=>{
    res.render('rsvp')
})

//Handles all other pages
app.get('/:page',(req,res)=>{

    let path = ""
    //DIRECTS USER AROUND
    switch(req.params.page){
        case 'about':
            res.render('about')
            break
        case 'about-me':
            res.render('about')
            break
        default:
            res.render('404')
            break
    }
})



app.get('/api/courses',(req,res)=>{
    res.send(courses)
})

app.get('/api/courses/:id',(req,res)=>{
    let course = courses.find(c=>c.id === parseInt(req.params.id))

    if(!course) return res.status(404).send('The course with the given ID was not found')
    res.send(course);
})

//POST endpoint 
// We use the npm package JOI to validate client POST requests
app.post('/api/courses',(req,res)=>{
    const { error } = validateCourse(req.body) //Object destructuring, ==result.error
  
    //Responds with 400 error and error info and quits POST operation if result.error = true
    if(error) return res.status(400).send(result.error)

    //Creates course
    const course = {
        id: courses.length+1,
        name: req.body.name || "UNNAMED"
    }

    //Adds to db
    courses.push(course);

    //Responds with sent info
    res.send(course);
})

//PUT endpoint
app.put('/api/courses/:id',(req,res)=>{
    //Look up course
    let course = courses.find(c=>c.id === parseInt(req.params.id))
    //If not real, return 404
    if(!course)  return res.status(404).send('The course with the given ID was not found')

    const { error } = validateCourse(req.body) //Object destructuring, ==result.error


    //Responds with 400 error and error info and quits POST operation if result.error = true
    if(error) return res.status(400).send(result.error)

    //Else update
    course.name = req.body.name;
    res.send(course)
})

app.delete('/api/courses/:id',(req,res)=>{
    //Look up the course
    let course = courses.find(c=>c.id === parseInt(req.params.id))
    //If not real, return 404
    if(!course) return res.status(404).send('The course with the given ID was not found')

    //Delete
    const index = courses.indexOf(course);

    courses.splice(index,1)

    res.send(course);

    //Return deleted course
})

// PORT - Dynamically assigned by host


function validateCourse(course){
    //Validate
    const schema = {
        name: Joi.string().min(5).required()
    };

    //This checks client input and stores in result var
    return Joi.validate(course,schema);

}