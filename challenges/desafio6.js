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
      maior_rating: true,
      menor_rating: true,
      media_rating: { $round: ["$media", true] },
      desvio_padrao: { $round: ["$desvio", true] },
      _id: false,
    },
  },
]);
