const db = require("../models");
const Movie = db.movie;
const Actor = db.actor;
exports.create = (actor) => {
  return Actor.create({
    name: actor.name,
  })
    .then((actor) => {
      console.log(">> Created Actor: " + JSON.stringify(actor, null, 2));
      return actor;
    })
    .catch((err) => {
      console.log(">> Error while creating Actor: ", err);
    });
};
exports.findAll = () => {
  return Actor.findAll({
    include: [
      {
        model: Actor,
        as: "actors",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((actors) => {
      return actors;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Actors: ", err);
    });
};
exports.findById = (id) => {
  return Actor.findByPk(id, {
    include: [
      {
        model: Actor,
        as: "actors",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((actor) => {
      return actor;
    })
    .catch((err) => {
      console.log(">> Error while finding Actor: ", err);
    });
};
exports.addMovie = (actorId, movieId) => {
  return Actor.findByPk(actorId)
    .then((actor) => {
      if (!actor) {
        console.log("Actor not found!");
        return null;
      }
      return Movie.findByPk(movieId).then((movie) => {
        if (!movie) {
          console.log("Movie not found!");
          return null;
        }

        actor.addMovie(movie);
        console.log(`>> added Movie id=${movie.id} to Actor id=${actor.id}`);
        return actor;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Movie to Actor: ", err);
    });
};