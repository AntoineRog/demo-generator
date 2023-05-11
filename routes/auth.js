const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { User } = require('../models/users');
const router = express.Router();

/* Inscription */
router.post('/register', async function (req, res, next) {
    const errors = []

    // Chercher si un user avec le login login existe dans la db
    const user = await User.findOne({ login: req.body.login }).exec()

    // Validation

    if (req.body.login === undefined || req.body.login.length === 0)
        errors.push('Vous devez indiquer un login')
    else if (user !== null)
        errors.push('Ce login est déjà utilisé')


    if (req.body.password === undefined || req.body.password.length === 0)
        errors.push('Vous devez indiquer un mot de passe')

    if (errors.length > 0)
        res.jsonResponse('Formulaire invalide', null, errors, 422)
    else {
        // Traitement
        const newUser = new User({
            login: req.body.login,
            password: req.hash(req.body.password),
            wins: 0,
            looses: 0,
        })

        // Sauvegarde en base de données
        newUser.save()
            .then(() => {
                console.log('Création d\'un user')
                res.jsonResponse('Inscription réussie', null, null, 201)
            })
            .catch(err => {
                console.error(err)

                res.jsonResponse('Erreur', null, null, 400)
            })
    }
});

/* Connexion */
router.post('/login', function (req, res, next) {
    console.log(req.headers);

    // Recherche d'un user avec le login et le password passé dans la requête
    const user = req.db.users.find(user =>
        user.login === req.body.login &&
        bcrypt.compareSync(req.body.password, user.password))

    // Si les identifiants sont mauvais on répond une erreur
    if (user === undefined) {
        res.jsonResponse('Echec de la connexion', null, null, 400)
    } else {
        // Sinon on créer un token de session
        const token = jwt.sign({
            id: user.id,
            login: user.login
        }, 'cookies')

        // On le sauvegarde en base de données
        req.db.sessions.push({
            user_id: user.id, // Number
            jwt_token: token, // String
            user_agent: req.headers['user-agent'], // String
            created_at: new Date() // Date
        })

        console.log(req.db.sessions)

        // On prépare les données à renvoyer avec la réponse
        const dataUser = { ...user }
        delete dataUser.password

        // console.log('Sessions', sessions)

        // On renvoie le token
        res.jsonResponse('Connexion réussie', {
            token: token,
            user: dataUser
        })
    }

    // console.log(req.body)
    // console.log(user)
    // console.log(users)
});

module.exports = router;