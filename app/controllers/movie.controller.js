const db = require("../models");
const Movie = db.movie;
const Actor = db.actor;
exports.create = (movie) => {
  return Movie.create({
    title: movie.title,
    description: movie.description,
  })
    .then((movie) => {
      console.log(">> Created Movie: " + JSON.stringify(movie, null, 4));
      return movie;
    })
    .catch((err) => {
      console.log(">> Error while creating Movie: ", err);
    });
};
exports.findAll = () => {
  return Movie.findAll({
    include: [
      {
        model: Actor,
        as: "actors",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["actor_id", "movie_id"],
        // },
      },
    ],
  })
    .then((movies) => {
      return movies;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Movies: ", err);
    });
};
exports.findById = (id) => {
  return Movie.findByPk(id, {
    include: [
      {
        model: Actor,
        as: "actors",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["actor_id", "movie_id"],
        // },
      },
    ],
  })
    .then((movie) => {
      return movie;
    })
    .catch((err) => {
      console.log(">> Error while finding Movie: ", err);
    });
};