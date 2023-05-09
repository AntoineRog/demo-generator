const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/crypt')

/* GET req.body. listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

/** GET Récupération des data d'un user */
/** Middlewares : auth */
router.get('/:id(\\d+)', auth, (req, res, next) => {
  console.log(req.headers)
  // console.log(req.db, req.params)
  
  // Récupération de l'user en base de données
  const user = req.db.users.find(user => user.id == req.params.id)

  // Si l'user n'existe pas on répond un 404
  if (user === undefined) {
    res.jsonResponse('La ressource n\'existe pas', null, null, 404)
  } else {
    // Sinon on répond avec les data du user
    const dataUser = { ...user }
    delete dataUser.password

    res.jsonResponse('Succès', {
      user: dataUser
    })
  }
})

module.exports = router;
