const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * Fonction pour crypter un texte
 * @param {String} val texte à crypter
 * @returns le texte crypté avec bcrypt
 */
function hash(val) {
    return bcrypt.hashSync(val, 10);
}

/**
 * Middleware Auth pour vérifier l'authorization sur une route
 * @param {*} req request
 * @param {*} res response 
 * @param {*} next next
 */
function auth(req, res, next) {
    // Récupération du token JWT
    const authorization = req.headers.authorization.split(' ')
    const token = authorization[1]

    // Vérification du token et décodage
    const decoded = jwt.verify(token, 'cookies')
    console.log(decoded)

    // On cherche une session avec le token pour vérifer la validité
    const session = req.db.sessions.find(session => session.user_id === decoded.id && token === session.jwt_token)

    // console.log(session, req.db.sessions)

    // Si la session n'existe pas en bdd on répond avec 403
    if (session === undefined)
        res.jsonResponse('Token invalid', null, null, 403)
    else {
        // Sinon on execute la suite
        next()
    }
}

module.exports = { hash, auth }