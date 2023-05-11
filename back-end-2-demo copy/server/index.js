require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

//middleware
//allows this to communicate with front end with runs on a different port
app.use(cors())
//converts files to json for back end to use
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

const { getAllMovies, createMovie, deleteMovie, updateMovie, fakeEndPoint } = require('./controller/controller.js')

//routes
app.get('/api/movies', getAllMovies)
app.post('/api/movies', createMovie)
app.delete('/api/movies/:movie_id', deleteMovie)
app.put('/api/movie/:id', updateMovie)
app.get('/api/food', fakeEndPoint)



app.listen(4000, () => console.log('Listening on port 4000 ...'))