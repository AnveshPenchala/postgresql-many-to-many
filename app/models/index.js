const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = require("./movie.model.js")(sequelize, Sequelize);
db.actor = require("./actor.model.js")(sequelize, Sequelize);

db.actor.belongsToMany(db.movie, {
  through: "movie_actor",
  as: "movies",
  foreignKey: "actor_id",
});
db.movie.belongsToMany(db.actor, {
  through: "movie_actor",
  as: "actors",
  foreignKey: "movie_id",
});

module.exports = db;