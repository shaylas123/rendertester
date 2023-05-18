// const express = require('express')
// const { DateTime } = require('luxon');
// const morgan = require('morgan')

// const app = express()

// app.use(express.json())

// morgan.token('reqBody', function (req, res) {
//   return JSON.stringify(req.body);
// });

// // Use the custom token in the Morgan middleware
// app.use(
//   morgan(':method :url :status :res[content-length] - :response-time ms :reqBody')
// );



// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]


// // the / is where do we get the request from, then we get a call back method:
// // The event handler function accepts two parameters. 
// // The first, request parameter, contains all of the information of the HTTP request,
// // the second, response parameter, is used to define how the request is responded to.
//   app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
//   })
  
//   app.get('/api/persons', (request, response) => {
//     response.json(persons)
//   })


//   app.get('/info', (request, response) => {

//     const people = persons.length;
    

//     const currentDateTime = DateTime.local();
//     const timeZoneName = currentDateTime.zoneName;


//     const formattedDate = currentDateTime.toFormat(`ccc LLL dd yyyy HH:mm:ss ('${timeZoneName}')`);


//     const res = `<div>Phonebook has info for ${people} people<br>${formattedDate}</div>`;
    
//     response.send(res)
//   })

//   app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id);
//     const person = persons.find(person => person.id === id);

//     if(person) {
//         response.json(person)
//     } else{
//         response.status(404).end()
//     }
//   })

//   app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id);
//     persons = persons.filter(person => person.id !== id);

//     response.status(204).end()
    
//   })

//   function generateId() {
//     return Math.floor(Math.random() * Number.MAX_VALUE);
//   }
//   function isNameExist(name) {
//     return persons.find(person => person.name === name)
//   }


//   app.post('/api/persons/', (request, response) => {
//     const body = request.body
//     if(!body.name || !body.number) {
//       return response.status(400).json({ 
//         error: 'name of number are missing' 
//       })
//     } 

//     if(isNameExist(body.name)) {
//         return response.status(400).json({ 
//             error: 'name is alreay in Phonebook' 
//         })
//     }

//     const person = {id: generateId(),
//                     name: body.name,
//                     number: body.number                
//     }
    
//     persons = persons.concat(person)
//     response.json(person)
    
//   })


  
// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

///////***************************************************///////////////////////////////////////////////////////////////////////////////////

const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')

app.use(cors())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
// the / is where do we get the request from, then we get a call back method:
// The event handler function accepts two parameters. 
// The first, request parameter, contains all of the information of the HTTP request,
// the second, response parameter, is used to define how the request is responded to.
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  // Calling the method will send the notes array that was passed to it as a JSON formatted string.
  // Express automatically sets the Content-Type header with the appropriate value of application/json.
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
    response.status(404).end()
    }
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

  
  


const PORT = process.env.PASSENGER_PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})