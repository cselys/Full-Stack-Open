const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('reqbody', (req) => {
  switch (req.method) {
  case 'POST':
    return JSON.stringify(req.body)
  default:
    return ' '
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'))

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))




app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})


app.get('/api/persons/:id', (request, response, next ) => {
  Person.findById(request.params.id)
    .then(p => {
      if(p)
        response.json(p)
      else
        response.status(404).end()
    })
    .catch( error => next(error))
  //response.status(404).json({message:'Person not found'});
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then( () => {
      response.status(204).end()
    })
    .catch ( error => next(error))
})

app.post('/api/persons', (request, response, next) => {

  const person = request.body
  if (!person) {
    return response.status(400).json({
      error: 'content missing'
    })
  }else if(person.name === ''){
    return response.status(400).json({
      error: 'name missing'
    })
  }else if(person.number === ''){
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const contact = new Person({
    name: person.name,
    number: person.number,
  })

  contact.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new:true, runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.get('/api/info', (request, response) => {
  const currentDateTime = new Date()
  Person.find({}).then(result => {
    response.send(`<p>Phonebook has infor for ${result.length} people <br/><br/>${currentDateTime}</p>`)
  })

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {

  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted name' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})