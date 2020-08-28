module.exports = function formatDbQuery(query) {
  const perPage = Number(query.perPage) || 20;
  const page = Number(query.page) || 1;
  delete query.perPage;
  delete query.page;

  const stats = ["Speed", "Glide", "Turn", "Fade"];

  let queries = [];

  stats.forEach(stat => {
    const minStat = query[`min${stat}`];
    const maxStat = query[`max${stat}`];

    if (minStat) {
      queries.push({ [stat.toLowerCase()]: { $gte: minStat }});
      delete query[`min${stat}`];
    }
    if (maxStat) {
      queries.push({ [stat.toLowerCase()]: { $lte: maxStat }});
      delete query[`max${stat}`];
    }
  });

  for (const key in query) {
    let options = [];

    if(!query[key]) continue;

    query[key].split(",").forEach(value => {
      options.push({ [key]: value })
    });
    queries.push({ $or: options });
  }

  const dbQuery = queries.length ? { $and: queries } : {};
  // console.log(`Query: ${JSON.stringify(dbQuery, null, 1)}`);

  return {
    dbQuery,
    perPage,
    page
  };
}
