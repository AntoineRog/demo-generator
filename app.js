// Packages
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Router
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

// Middlewares
const { jsonResponse } = require('./middlewares/response')
const { hash } = require('./middlewares/crypt')

// Création de l'application
const app = express();

// Initilisation des middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Base de données temporaire
 */
var users = [
    {
        id: 1, // Number
        login: 'Leroy', // String,
        password: hash("Mot de passe"), // String
        wins: 0, // Number
        looses: 0, // Number
    }
]

var sessions = [
    { // Exemple du format de la donnée
        user_id: 1, // Number
        jwt_token: "jwt", // String
        user_agent: "Postman", // String
        created_at: "21-03-2222" // DateTime
    }
]

// Ajout de fonctions et/ou données dans la request et la réponse des requêtes
app.use((req, res, next) => {
    req.db = {
        users: users,
        sessions: sessions
    }

    req.hash = hash

    // Response
    res.jsonResponse = jsonResponse
    next()
})

// Initialisation des routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// export
module.exports = app;