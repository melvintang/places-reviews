var express = require('express')
var router = express.Router()
var passport = require('passport')

var User = require('../models/user')
var Review = require('../models/review')
var Place = require('../models/place')
var userController = require('../controllers/userController')

// route middleware to make sure a user is logged in
function isLoggedIn (req, res, next) {
  // res.send(req.isAuthenticated())
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next()
  // if they aren't redirect them to the home page
  res.redirect('/login')
}

function isNotLoggedIn (req, res, next) {
  if (! req.isAuthenticated())
    return next()
  // if they aren't redirect them to the home page
  res.redirect('/profile')
}

router.get('/', function (req, res) {
  res.redirect('/places'); // load the index.ejs file
})

// login routes
// GET /login: Make sure user is not logged in 1st
router.get('/login', isNotLoggedIn, userController.getLogin)

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}))

// signup routes
router.get('/signup', isNotLoggedIn, userController.getSignup)

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}))

router.get('/profile', isLoggedIn, function (req, res) {
  Review.find({
    user_id: req.user.id
  })
    .populate('place_id')
    .exec(function (err, reviews) {
      res.render('users/profile', {
        user: req.user,
        reviews: reviews
      })
    })
})

router.get('/logout', isLoggedIn, function (req, res) {
  req.logout()
  res.redirect('/')
})

// places routes
// A list of saved places
router.get('/places', function (req, res) {
  Place.find({}, function (err, places) {
    var canReview = false
    if (req.user) canReview = true
    res.render('places/index', {places: places, canReview: canReview})
  })
})

// Fill in the form of a place only! Adding of places = ok
router.post('/places', function (req, res) {
  var newPlace = new Place ({
    name: req.body.place.name,
    address: req.body.place.address,
    city: req.body.place.city,
    state: req.body.place.state,
    phone: req.body.place.phone
  })
  newPlace.save(function(err, savedPlace) {
    if(err) throw new Error(err);
    // res.send(savedPlace)
    res.redirect ('/places')
  })
})

// Get a new form of place only!
router.get('/places/new', isLoggedIn, function (req, res) {
  res.render('places/new')
})

// Know more about the place via each link in the list of places.
router.get('/places/:name', function (req, res){
  console.log(req.params.name)
  Place.findOne ({name: req.params.name}, function (err, place) {
      Review.find (
        {
          place_id: place.id
        }
      )
      .populate('user_id')
      .exec (function (err, reviews){

        // res.send(reviews)
        res.render('places/onePlace', {place: place, reviews: reviews})
      })

  })
})


// My adding of reviews
router.get('/places/:name/newReview', isLoggedIn, function (req, res) {
  Place.findOne({name: req.params.name}, function (err, place) {
    res.render('reviews/new', {place: place})
  })
})

router.post('/places/:name', function (req, res) {
  Place.findOne({name: req.params.name}, function (err, place) {
    var newReview = new Review({
      title: req.body.review.title,
      comments: req.body.review.comments,
      rating: req.body.review.rating,
      user_id: req.user.id,
      place_id: place._id
    })

    // res.send(newReview)
    newReview.save(function (err, savedReview) {
      // res.send(err)
      // res.send(savedReview)
      res.redirect('/places/' + req.params.name)
    })
  })
})

// Show the logged in user's review only
router.get('/reviews/:id', function (req, res) {
  Review.findById(req.params.id)
    .populate('place_id')
    .exec(function (err, review) {

      res.render('reviews/OneReview', {review: review})
    })
})

// Edit a review: Note that a logged in user can only edit his own review!
router.get('/reviews/:id/edit', isLoggedIn, function (req, res) {
  // How to get user_id
  Review.findById(req.params.id)
    .populate('place_id')
    .exec(function (err, review) {
      res.render('reviews/edit', {review: review})
    })
})

router.post ('/reviews/:id/edit', function(req, res) {
  Review.findById (req.params.id, function (err, foundReview) {
    if (err) {
      res.render ('reviews/edit')
    }
    else {
      foundReview.title = req.body.review.title,
      foundReview.comments = req.body.comments,
      foundReview.rating = req.body.rating
      foundReview.save (function (err, newerReview) {
        res.redirect ('/profile')
    })
  }
  })
})
// router.put('/reviews/:id', function (req, res) {
//   Review.findByIdAndUpdate(req.params.id, {title: req.body.title, comments: req.body.comments, rating: req.body.rating}, function (err, review) {
//     if (err) {
//       res.render('reviews/edit')
//     } else {
//       res.redirect('/profile')
//     }
//   })
// })

// The logged in user can delete his own reviews only!
router.delete('/reviews/:id/', function (req, res) {
  Review.findByIdAndRemove(req.params.id, function (err, review) {
    if (err) {
      console.log(err)
      res.render('reviews/edit')
    } else {
      res.redirect('/profile')
    }
  })
})

module.exports = router
