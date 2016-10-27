// var express = require('express')
// var router = express.Router()
//
// var Place = require('../models/place')
//
// router.get('/', function (req, res) {
//   User.find({}, function (err, allUsers) {
//     res.json(allUsers)
//   })
// })
//
// router.get('/place.name', function (req, res){
//   // res.send ('requested id is ' + req.params.id)
//   Place.findOne({'_id': req.params.id}, function (err, user){
//     res.json(user)
//   })
// })
//
// // Very important: Public static file main.js -> click on form button -> posted!
// router.post('/', function (req, res) {
//   // res.json('ok')
//   console.log(req)
//   Place.findOne ({name: req.body.place.data}, function (err, place) {
//     console.log(place)
//     if (err) {
//       console.log('die')
//     } else {
//       res.redirect('/places/' + place.name);
//     }
//   })
//   // Place.create(req.body.place, function (err, newUser) {
//   //   res.json(newUser)
//   // })
// })
//
// module.exports = router
