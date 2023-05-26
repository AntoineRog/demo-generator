const mongoose = require('mongoose')

async function dbconnect() {
    // connexion à la base de données
    await mongoose.connect('mongodb://127.0.0.1:27017/pierrepapierciseaux')
    console.log('Connexion à mongodb OK')
}

dbconnect()

module.exports = mongoose