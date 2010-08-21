require.paths.unshift('vendor/express/lib')
require('express')
require('express/plugins')

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
  this.redirect('/')
})

run(parseInt(process.env.PORT || 8000), null)

