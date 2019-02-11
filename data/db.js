const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  hubs: {
    find,
    findById,
    insert,
    update,
    remove
  }
};
let nextId = 1;

const _hubs = [
  {
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String
    created_at: "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)", // Date, defaults to current date
    updated_at: "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)" // Date, defaults to current date
  }
];

function find() {
  // return db(_hubs); // I couldn't get this to work
  if (_hubs.length > 0) {
    return Promise.resolve(_hubs);
  } else {
    return Promise.reject({
      code: 500,
      message: "The user information could not be retrieved."
    });
  }
}

function findById(id) {
  return db("users")
    .where({ id: Number(id) })
    .first();
}

function insert(user) {
  // return db("users")
  //   .insert(user)
  //   .then(ids => ({ id: ids[0] }));
}

function update(id, user) {
  return db("users")
    .where("id", Number(id))
    .update(user);
}

function remove(id) {
  return db("users")
    .where("id", Number(id))
    .del();
}
