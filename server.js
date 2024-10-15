const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/database')
const Actor = require('./models/Actor')
const Film = require('./models/Film')
const FilmActor = require('./models/FilmActor')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hoal mundo !')
})

app.get('/actors', async (req, res) => {
  try {
    const actors = await Actor.findAll()
    res.json(actors)
  } catch (error) {
    res.status(500).send({ error: 'no se pudieron traers los actores' })
  }
})

app.post('/actors', async (req, res) => {
  try {
    // eslint-disable-next-line
    const { first_name, last_name } = req.body
    // eslint-disable-next-line
    const actor = await Actor.create({ first_name, last_name })
    res.status(201).json(actor)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear el actor' })
  }
})

app.get('/films', async (req, res) => {
  try {
    const films = await Film.findAll()
    res.json(films)
  } catch (error) {
    res.status(500).send({ error: 'no se pudieron traers los peliculones' })
  }
})

app.post('/films', async (req, res) => {
  try {
    // eslint-disable-next-line
    const { title, description, release_year } = req.body
    // eslint-disable-next-line
    const film = await Film.create({ title, description, release_year })
    res.status(201).json(film)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear la peli' })
  }
})

// Relacionar actor con peli
app.post('/actors/:actorId/films/:filmId', async (req, res) => {
  try {
    const { actorId, filmId } = req.params
    const actor = await Actor.findByPk(actorId)
    const film = await Film.findByPk(filmId)

    if (!actor || !film) {
      res.status(404).send({ error: 'no se encontro el actor o la peli' })
    }

    await film.addActor(actor)
    res.status(201).json({ message: 'Actor y peli asociada correctamente' })
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear la peli' })
  }
})

app.get('/actors/films', async (req, res) => {
  try {
    const actors = await Actor.findAll(
      {
        include: {
          model: Film
        }
      }
    )
    res.status(201).json(actors)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear la peli' })
  }
})

app.get('/films/actors', async (req, res) => {
  try {
    const films = await Film.findAll(
      {
        include: {
          model: Actor
        }
      }
    )
    res.status(201).json(films)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear la peli' })
  }
})

app.get('/actors/:actorId/films', async (req, res) => {
  const { actorId } = req.params
  try {
    const actor = await Actor.findByPk(actorId,
      {
        include: {
          model: Film
        }
      }
    )
    res.status(201).json(actor)
  } catch (error) {
    res.status(500).send({ error: 'no se pudo crear la peli' })
  }
})

app.listen(port, async () => {
  await sequelize.authenticate()
  console.log(`server funcando en http://localhost:${port}`)
})
