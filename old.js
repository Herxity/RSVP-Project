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