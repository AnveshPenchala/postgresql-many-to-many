const db = require("./app/models");
const MovieController = require("./app/controllers/movie.controller");
const ActorController = require("./app/controllers/actor.controller");

const run = async () => {
const movie1 = await MovieController.create({
  title: "Movie#1",
  description: "Movie#1 Description",
});
const movie2 = await MovieController.create({
  title: "Movie#2",
  description: "Movie#2 Description",
});

const movie3 = await MovieController.create({
  title: "Movie#3",
  description: "Movie#3 Description",
});

const movie4 = await MovieController.create({
  title: "Movie#4",
  description: "Movie#4 Description",
});
const actor1 = await ActorController.create({
  name: "Actor#1",
});
const actor2 = await ActorController.create({
  name: "Actor#2",
});
const actor3 = await ActorController.create({
  name: "Actor#3",
});
const actor4 = await ActorController.create({
  name: "Actor#4",
});
await ActorController.addMovie(actor1.id, actor1.id);
// >> added Movie id=1 to Actor id=1

await ActorController.addMovie(actor1.id, actor2.id);
// >> added Movie id=2 to Actor id=1

await ActorController.addMovie(actor1.id, actor3.id);
// >> added Movie id=3 to Actor id=1

await ActorController.addMovie(actor2.id, actor3.id);
// >> added Movie id=3 to Actor id=2

await ActorController.addMovie(actor2.id, actor4.id);
// >> added Movie id=4 to Actor id=2

await ActorController.addMovie(actor2.id, actor1.id);
// >> added Movie id=1 to Actor id=2
const _actor1 = await ActorController.findById(actor1.id);
console.log(">> actor1", JSON.stringify(_actor1, null, 2));
const actors = await ActorController.findAll();
console.log(">> actors", JSON.stringify(actors, null, 2));
const _movie = await MovieController.findById(movie3.id);
console.log(">> movie3", JSON.stringify(_movie, null, 2));
const movies = await MovieController.findAll();
console.log(">> movies", JSON.stringify(movies, null, 2));
};


// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});