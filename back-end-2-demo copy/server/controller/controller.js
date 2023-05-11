require('dotenv').config()
const db = require('../db.json')
let id = db.length


const { ROLLBAR_ACCESS_TOKEN} = process.env
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: `${ROLLBAR_ACCESS_TOKEN}`,
  captureUncaught: true,
  captureUnhandledRejections: true,
})


module.exports = {
    fakeEndPoint: (req, res) => {
           rollbar.info('fake endpoint reached')
       .then((dbRes) => res.status(200).send(dbRes[0]))
         .catch((err) => {
           console.log(err);
           rollbar.info('fake endpoint not reached')
            res.status(500).send(err)});
    },

    getAllMovies : (req, res) => {
        let allMovies = db
        rollbar.critical('nothing is displaying')
        res.status(200).send(allMovies)
    },
    createMovie : (req, res) => {
        id++
       let newMovie = {...req.body, id: id}
       db.push(newMovie)
       rollbar.warning('new movies are not being created')
       res.status(200).send(db)
    }, 
    deleteMovie : (req, res) => {
       //const id = req.params.id  // that why you add :id to the route - this must match
       const {movie_id} = req.params  
       for (let i = 0; i < db.length; i++) {
        if (db[i].id === +movie_id) {
            db.splice(i, 1)
        }
       }
       rollbar.error('movies are not being deleted')
       res.status(200).send(db)
    },
    updateMovie : (req, res) => {
        const {movie_id} = req.params
        const {type} = req.body

        for(let i = 0; i < db.length; i++) {
            if(db[i].id === +movie_id) {
                if (type === 'minus') {
                db[i].rating++
            }
            if (type === 'minus') {
                db[i].rating--
            }
        }
    }
}
}