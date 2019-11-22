var express = require('express'); //웹서버 사용
var session = require('express-session')
var bodyParser = require('body-parser');
var app = express();

var mysql = require('mysql')

//mysql 커넥션 생성
var connection = mysql.createConnection({
  host: "localhost", //서버 로컬 IP
  user: "root", //계정 아이디
  password: "1234", //계정 비밀번호
  database: "wwj" //접속할 DB
  //multipleStatements: true
})

// ------- Create Session -------
var createSession = function createSession() {
  return function (req, res, next) {
    if (!req.session.login) {
      req.session.login = 'logout';
    }
    next();
  };
};

app.locals.pretty = true; // html code readability
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
//app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret: '1234DSFs@adf1234!@#$asd',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 },
}));
app.use(createSession());

var router = require('./routes/index.js')(app);
app.use('/', router);

app.listen(3303, function(){
  console.log('Server Start...');
})
