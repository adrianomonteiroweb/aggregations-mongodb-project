db.trips.aggregate([
  {
    $match: { $and: [{ birthYear: { $ne: null } }, { birthYear: { $ne: "" } }] },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: "$birthYear" },
    },
  },
  {
    $project: {
      menorAnoNascimento: { $toInt: "$menorAnoNascimento" },
      _id: 0,
      maiorAnoNascimento: 1,
    },
  },
]);
