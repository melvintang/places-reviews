router.post('/:id/edit', function (req, res) {    Review.findById(req.params.id, function (err, foundReview) {
  foundReview.rating = req.body.rating
foundReview.comments = req.body.comments
foundReview.postedBy = req.user  foundReview.save(function (err, newerReview) {
   res.redirect('/shoppingsites/' + foundReview.shopping_id)
 })
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
    }
    })
  })
})

router.post('/reviews/:id/edit', function (req, res) {
  Review.findByIdAndUpdate(req.params.id, {title: req.body.title, comments: req.body.comments, rating: req.body.rating}, function (err, review) {
    if (err) {
      res.render('reviews/edit')
    } else {

      res.redirect('/profile')
    }
  })
})
