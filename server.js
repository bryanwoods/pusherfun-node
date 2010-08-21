require.paths.unshift('vendor/express/lib', 'vendor/simple_pusher')
require('express')
require('express/plugins')

var simple_pusher = require('simple_pusher')

var config = {
  appId:  '1786',
  key:    '09435da909450e9b4b6e',
  secret: '6112f12f27007eaab27d'
};

var channel = "pusherfun-development";
var eventName = "new_message";

configure(function() {
  set('root', __dirname)
  use(Logger)
  use(Static, {
    path: require('path').join(__dirname, 'public')
  }) 
  enable("show exceptions")
})

get('/', function() {
  this.render('index.html.haml', {
    layout: false,
    locals: {
      title: 'PusherFun',
      messages: ''
    }
  })
})

post('/messages', function() {
  var message = {
    screen_name: this.param('screen_name'),
    message:     this.param('message')
  };
  simple_pusher.trigger(config, channel, eventName, message);
})

get('/public/*', function(file) { 
  this.sendfile(__dirname + '/public/' + file) 
}) 

run(parseInt(process.env.PORT || 8000), null)

