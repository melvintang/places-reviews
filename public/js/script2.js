$(document).ready(function ($) {
  var $submit = $('#pac-input')
  var $form = $('.navbar-form')
  $form.on('submit', function (e) {
    e.preventDefault()
    // console.log($(this).serializeArray())
    // var formdata = $(this).serializeArray()
    // console.log(formdata)
    // formdata = [obj{name: [loca][name]  , value: [local] [value] } obj{name: value:   }]
    $input = $("#searchInput").val()
    console.log($input)
    // ajax post request from app.js to router.post
    // formdata is attached to request and parsing it as req.body.user
    alert($input)
    $.ajax({
      type: 'POST',
      url: '/api/places',
      data: $input
    }).done(doSomething)
  })

  function doSomething (data) {
    alert(data)
  }
})
