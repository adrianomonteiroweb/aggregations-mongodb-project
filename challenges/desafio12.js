db.trips.aggregate([{
  $lookup: {
    from: "trips",
    pipeline: [{
      $group: {
        _id: { $dayOfWeek: "$startTime" }, count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 1,
    },
    {
      $project: { diaDaSemana: "$_id", _id: 0 },
    },
    ],
    as: "diaEscolhido",
  },
},
{ $unwind: "$diaEscolhido" },
{
  $match: {
    $expr: {
      $eq: [{ $dayOfWeek: "$startTime" }, "$diaEscolhido.diaDaSemana"],
    },
  },
},
{
  $group: {
    _id: "$startStationName", count: { $sum: 1 },
  },
},
{ $sort: { count: -1 } },
{ $limit: 1 },
{
  $project: {
    nomeEstacao: "$_id",
    total: "$count",
    _id: 0,
  },
}]);
