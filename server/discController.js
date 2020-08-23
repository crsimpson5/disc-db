const disc = require("./models/Disc");
const formatDbQuery = require("./util/formatDbQuery");

module.exports = {
  findAll: async (req, res) => {
    const { dbQuery, perPage, page } = formatDbQuery(req.query);

    const count = await disc.find(dbQuery).countDocuments();

    disc
      .find(dbQuery).sort({ _id: 1 }).limit(perPage).skip(perPage * (page - 1))
      .then(data => res.json({ count, body: data }))
      .catch(err => res.json(err));
  },
  findById: (req, res) => {
    disc
      .findOne({ _id: req.params. id })
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },
  create: (req, res) => {
    if (Array.isArray(req.body)) {
      disc
      .insertMany(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
    } else {
      disc
      .create(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
  },
  updateMany: (req, res) => {
    disc
      .updateMany(req.body.query, req.body.update)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  },
  deleteOne: (req, res) => {
    disc
      .findOneAndDelete({ _id:  req.params.id })
      .then(data => res.json(data))
      .catch(err => res.json(err));
  }
};
