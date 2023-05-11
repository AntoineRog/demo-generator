const mongoose = require('./connect')
const modelName = 'Session'

const sessionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true },
    jwt_token: { type: String, required: true },
    user_agent: String,
    created_at: Date
})

const Session = mongoose.model(modelName, sessionSchema)

module.exports = { modelName, sessionSchema, Session }