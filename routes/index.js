var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwayRoute = require('../routes/catways');
const userService = require('../services/users');
const Catway = require('../models/catway');
const User = require('../models/user');
const Reservation = require('../models/reservation');
const private = require('../middlewares/private');
const catway = require('../models/catway');


/* ROUTE PAGE D'ACCUEIL */ 
router.get('/', async (req, res) => {

  res.render('pages/index', {
    title: 'Accueil'
  });
});

router.post('/login', userService.authenticate);

/* ROUTE TABLEAU DE BORD */ 
router.get('/dashboard', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/');
  }

  res.render('pages/dashboard', {
    user: req.session.user,
    date: new Date()
  });
});

/* ROUTE VERS LA PAGE DE GESTION DES UTILISATEURS, USERS.EJS*/ 
router.get('/users', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }
    let users = [];
    let searchedUser = null;

    if (req.query.email) {

        searchedUser = await User.findOne({
            email: req.query.email
        });
    } else {
        users = await User.find();
    }
    res.render('pages/users', {
        user: req.session.user,
        users,
        searchedUser
    });
});

/* ROUTE D'AJOUT D'UTILISATEURS */ 
router.post('/users', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }
    try {
        await User.create(req.body);
        return res.redirect('/users');

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

/* ROUTE SERVANT À MODIFIER LES UTILISATEURS, MAJ */ 
router.post('/users/update', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }
    try {
      await User.updateOne(
        {
          email: req.body.email
        },
        {
          $set: {
              name: req.body.name,
              firstname: req.body.firstname,
              password: req.body.password
          }
        }
      );
      return res.redirect('/users');
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
});

/* ROUTE SERVANT À SUPPRIMER LES UTILISATEURS */ 
router.post('/users/delete', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }
    await User.deleteOne({
        email: req.body.email
    });
    res.redirect('/users');
});

/* ROUTE VERS LA PAGE DE GESTION DES CATWAYS, CATWAYS.EJS */ 
router.get('/catways', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }
    let catways = [];
    let catway = null;
    if (req.query.catwayNumber) {
        catway = await Catway.findOne({
            catwayNumber: req.query.catwayNumber
        });
    } else {
        catways = await Catway.find();
    }

    res.render('pages/catways', {
        user: req.session.user,
        catways,
        catway
    });
});

/* ROUTE D'AJOUT DE CATWAY */ 
router.post('/catways', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        await Catway.create(req.body);
        return res.redirect('/catways');

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }
});

/* ROUTE SERVANT À MODIFIER LES CATWAYS, MAJ */ 
router.post('/catways/update', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }
    await Catway.updateOne(
        {
            catwayNumber: req.body.catwayNumber
        },
        {
            catwayType: req.body.catwayType,
            catwayState: req.body.catwayState
        }
    );
    res.redirect('/catways?catwayNumber=' + req.body.catwayNumber);
});

/* ROUTE SERVANT À SUPPRIMER LES CATWAYS */ 
router.post('/catways/delete', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }
    await Catway.deleteOne({
        catwayNumber: req.body.catwayNumber
    });
    res.redirect('/catways');
});

/* ROUTE VERS LA PAGE DE GESTION DES RESERVATIONS */ 
router.get('/reservations', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }

    try {

        let reservations = [];
        let searchedReservation = null;

        if (req.query.catwayNumber) {

            searchedReservation = await Reservation.findOne({
                catwayNumber: req.query.catwayNumber
            });

        } else {
            reservations = await Reservation.find();
        }

        res.render('pages/reservations', {
            user: req.session.user,
            reservations,
            searchedReservation
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }
});

/* ROUTE D'AJOUT DE RESERVATION */ 
router.post('/reservations', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        await Reservation.create(req.body);
        return res.redirect('/reservations');

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }
});

/* ROUTE SERVANT À MODIFIER LES RESERVATIONS, MAJ */ 
router.post('/reservations/update', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }

    try {
        await Reservation.updateOne(
            { catwayNumber: req.body.catwayNumber },
            {
                $set: {
                    clientName: req.body.clientName,
                    boatName: req.body.boatName,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate
                }
            }
        );
        return res.redirect('/reservations');
    } catch (error) {

        console.log(error);
        return res.status(500).json(error);

    }
});

/* ROUTE SERVANT À SUPPRIMER LES RESERVATIONS */ 
router.post('/reservations/delete', async (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }

    try {

        await Reservation.deleteOne({
            catwayNumber: req.body.catwayNumber
        });

        return res.redirect('/reservations');

    } catch (error) {

        console.log(error);
        return res.status(500).json(error);
    }
});

/* Problème au niveau de l'id des reservations(numero de catway)
, sur un seul numero de catway on peut y ajouter plusieurs reservations 
à la même date, ce qui pose problème, une solution serait de rendre 
le numero de catway inaccessible à toute nouvelle reservation 
durant les dates bloquées, reservées. */ 

router.use('/api/users', userRoute);
router.use('/api/catways', catwayRoute);

module.exports = router;
