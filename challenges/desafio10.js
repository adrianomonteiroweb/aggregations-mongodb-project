const milisegundoEmHora = 3600000;

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      "diferença de horas somadas": {
        $sum: { $subtract: ["$stopTime", "$startTime"] },
      },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $divide: [{ $divide: ["$diferença de horas somadas", "$count"] }, milisegundoEmHora] },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      tipo: 1,
    },
  },
  { $sort: { tipo: -1 } },
]);
