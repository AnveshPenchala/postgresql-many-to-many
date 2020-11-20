module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("movie", {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  return Movie;
};