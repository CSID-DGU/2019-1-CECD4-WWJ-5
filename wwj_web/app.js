var express = require('express'); //웹서버 사용
var session = require('express-session')
var bodyParser = require('body-parser');
var app = express();

var mysql = require('mysql')

app.locals.pretty = true; // html code readability
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
//app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended:true}));
var router = require('./routes/index.js')(app);
app.use('/', router);

app.listen(3303, function(){
  console.log('Server Start...');
})
