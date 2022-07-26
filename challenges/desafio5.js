const favoriteActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $match:
    {
      countries: { $all: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: favoriteActors },
    },
  },
  { $project:
    {
      num_favs: { $size: { $setIntersection: ["$cast", favoriteActors] } },
      title: 1,
      _id: 0,
      "tomatoes.viewer.rating": 1,
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  {
    $project: { num_favs: 0, tomatoes: 0 },
  },
  { $skip: 24 },
  { $limit: 1 },
]);
