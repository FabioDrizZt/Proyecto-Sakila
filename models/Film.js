const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Film = sequelize.define('Film', {
  film_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  release_year: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'film',
  timestamps: false
})

module.exports = Film
