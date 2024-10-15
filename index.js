const sequelize = require('./config/database')
const Actor = require('./models/Actor')
const Film = require('./models/Film')
const FilmActor = require('./models/FilmActor')

async function start () {
  try {
    await sequelize.authenticate()
    console.log('Conectado exitosamente')

    // Sincronizar
    await sequelize.sync({ alter: true })

    // Crear un actor y una peli
    const actor = await Actor.create({
      first_name: 'Leo',
      last_name: 'Di Caprio'
    })
    const film = await Film.create({
      title: 'Inception',
      description: 'Dom Cobb es un ladrón con una extraña habilidad para entrar a los sueños de la gente y robarles los secretos de sus subconscientes. Su habilidad lo ha vuelto muy popular en el mundo del espionaje corporativo, pero ha tenido un gran costo en la gente que ama. Cobb obtiene la oportunidad de redimirse',
      release_year: 2010
    })
    console.log('agregando peli y actor ...')
    // Asociar actor y peli
    await actor.addFilm(film)
    console.log('Agregados peli y actor correctamente')
  } catch (error) {
    console.log('Error al conectar a la BD')
  }
}

start()
