$(document).ready(function() {
  var server = new Pusher("09435da909450e9b4b6e", "pusherfun-development");
  server.bind('new_message', function(message) {
    $(".messages").prepend(
    '<p><b>' + message.screen_name + '</b>: ' +
    message.message + '</p>');
  });
  $("#new_message_form").submit(function() {
    $(".screen_name_field").hide();
    $.post("/messages", $("#new_message_form").serialize(), function(message) {
      $(".messages").prepend('<p>' + message + '</p>');
      $("input#message_input").val("");
    });
    return false;
  });
});   
