// Edit a place: Note that anybody can edit his own place!
router.get('/places/:id/edit', isLoggedIn, function (req, res) {
  // How to get user_id
  Review.findById(req.params.id)
    .populate('place_id')
    .exec(function (err, review) {
      res.render('reviews/edit', {review: review})
    })
})
