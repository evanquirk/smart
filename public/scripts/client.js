//Function for sliding out the log-in after clicking on right-nav area.

const logInSlider = function () {
  $('.logIn').hide();
  $('.login-button').click(function () {
    $('.register').hide();
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
    $('.register').slideToggle(400, function () {
      $('#register-email').focus();
    });
  });
};


const toDoSlider = function () {
  $('.search-bar').hide();
  $('.make-new-todo').click(function () {
    $('.search-bar').slideToggle(400, function () {
      $('.text-area').focus();
    });
  });
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


$(document).ready(function () {
  logInSlider();
  registerSlider();
  toDoSlider();
  escape();

})
