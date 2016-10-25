// $(document).ready(function ($) {
//   var $userForm = $('.oldReview')
//
//   $userForm.on('submit', function (e) {
//     e.preventDefault()
//     var formdata = $(this).serializeArray()
//
//     window.alert('ajax call now')
//
//     $.delete({
//       url: '/api/users',
//       data: formdata
//     }).done(doSomething)
//   })
//
//   function doSomething (data) {
//     window.alert('form submitted, new users created')
//     $('#all-user-list').append('<li>' + data.local.name + '<br>' + data.local.email + '<br>' + data.local.password + '</li>')
//   }
// })
