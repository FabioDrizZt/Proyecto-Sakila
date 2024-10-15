const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Actor = require('./Actor')
const Film = require('./Film')

const FilmActor = sequelize.define('FilmActor', {
  actor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Actor,
      key: 'actor_id'
    }
  },
  film_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Film,
      key: 'film_id'
    }
  }
}, {
  tableName: 'film_actor',
  timestamps: false
})

// Definir las relaciones
Actor.belongsToMany(Film, { through: FilmActor, foreignKey: 'actor_id' })
Film.belongsToMany(Actor, { through: FilmActor, foreignKey: 'film_id' })

module.exports = FilmActor
