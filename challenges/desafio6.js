db.movies.aggregate([
  { $match: { awards: { $regex: /Won.*.oscar/i } } },
  { $group: {
    _id: null,
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media: { $avg: "$imdb.rating" },
    desvio: { $stdDevSamp: "$imdb.rating" } },
  },
  {
    $project: {
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media", 1] },
      desvio_padrao: { $round: ["$desvio", 1] },
      _id: 0,
    },
  },
]);
