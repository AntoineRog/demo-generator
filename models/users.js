const mongoose = require('./connect')
const modelName = 'User'

// Schéma pour le model mongoose
const userSchema = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true},
    wins: Number,
    looses: Number,
})

// Model
const User = mongoose.model(modelName, userSchema)

module.exports = { modelName, userSchema, User }