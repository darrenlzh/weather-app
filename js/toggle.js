$(document).ready(function() {

  // DAY TOGGLE
  $('#day').click(function(){
    $('body, #toggle').removeClass().addClass('day-theme');
  });

  // NIGHT TOGGLE
  $('#night').click(function(){
    $('body, #toggle').removeClass().addClass('night-theme');
  });

  // NORMAL TOGGLE
  $('#normal').click(function(){
    $('body, #toggle').removeClass().addClass('normal-theme');
  });

  $('#celsius').click(function() {
    $(this).addClass('clicked');
    $('#fahrenheit').removeClass();
  });

  $('#fahrenheit').click(function() {
    $(this).addClass('clicked');
    $('#celsius').removeClass();
  });

});
