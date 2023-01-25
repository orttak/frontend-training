const   db = require('./db-config.js');

module.exports = {
    findAktor,
    findAktorById,
    addAktor,
    updateAktor,
    deleteAktor
}

function findAktor () {
    return  db('aktor');
}

function findAktorById(id) {
    return db("aktor").where({ id:id }).first();
  }
  

function addAktor(yeniAktor) {
    return db("aktor")
      .insert(yeniAktor)
      .returning('id')
      .then(data => {
        console.log("***************************************")
        console.log(data)
        return db('aktor').select('id').where({id: data[0].id}).first();
      });
}

function updateAktor(updatedAktor, id) {
    return db("aktor")
    .update(updatedAktor)
    .where({id})
    .then(data => {
        return db('aktor').where({id:id}).first();
    })
}

function deleteAktor(id) {
    return db("aktor")
    .where({id})
    .del();
  }