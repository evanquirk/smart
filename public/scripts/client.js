//Function for sliding out the log-in after clicking on right-nav area.

const logInSlider = function () {
  $('.logIn').hide();
  $('.login-button').click(function () {
    $('.register').hide();
    console.log("GET THAT LOG IN")
    $('.logIn').slideToggle(400, function () {
      $('#log-in-email').focus();
    });
  });
};

//Function for sliding out registration form after clicking on right-nav area.
const registerSlider = function () {
  $('.register').hide();
  $('.register-button').click(function () {
    $('.logIn').hide();
    console.log("GET THAT REGISTER")
    $('.register').slideToggle(400, function () {
      $('#register-email').focus();
    });
  });
};

$(document).ready(function () {
  logInSlider();
  registerSlider();

})
