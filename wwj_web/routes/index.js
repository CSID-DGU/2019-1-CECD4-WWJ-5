module.exports = function (app) {
  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var JSAlert = require("js-alert");
  var url = require('url');
  let {PythonShell} = require('python-shell');

  let test_val = 15;

  var twitter_options = {
    mode : 'text',
    pythonPath : '',
    pythonOptions : ['-u'],
    scriptPath : '/home/wwj/2019-1-CECD4-WWJ-5/crawler/tweeter',
    args : ['value1', 'value2', 'value3', 'value4', 'value5', 'value6', 'value7', 'value8', 'value9', 'value10', 'value11', 'value12', 'value13', 'value14', 'value15', 'value16', 'value17', 'value18', 'value19', 'value20']
  };

  var instagram_options = {
    mode : 'text',
    pythonPath : '',
    pythonOptions : ['-u'],
    scriptPath : '/home/wwj/2019-1-CECD4-WWJ-5/crawler/instagram',
    args : ['value1', 'value2', 'value3', 'value4', 'value5']
  };

  var test_options = {
    mode : 'text',
    pythonPath : '',
    pythonOptions : ['-u'],
    scriptPath : '/home/wwj/2019-1-CECD4-WWJ-5/crawler/tweeter',
    args : ['from:@gradProject_WWJ']
  }

  //트위터 크롤러
  // PythonShell.run('tweetcrawler.py', test_options, function(err, results){
  //   if(err) throw err;
  //   console.log(results);
  // });

  //인스타그램 크롤러
  // PythonShell.run('crawler.py', instagram_options, function(err, results){
  //   if(err) throw err;
  //   console.log("instagram crawler start...")
  //   console.log(results);
  //   console.log("instagram crawler end...")
  // });

  var connection = mysql.createConnection({
		host: "localhost", //서버 로컬 IP
		user: "root", //계정 아이디
		password: "1234", //계정 비밀번호
		database: "wwj" //접속할 DB
	})

  router.get('/', function (req, res) {
		res.status(200);
		res.render('index', {
			url: req.url,
			login: req.session.login,
			userid: req.session.userID,
      username: req.session.username
		});
	})

  //login
  router.post('/login', function(req, res) {
    var id = req.body.userID;
    var pw = req.body.userPW;
    res.status(200);
    var queryString = 'select * from user where userid=? and password=?'
    connection.query(queryString, [id, pw], function(error, data){
      if(error){
        console.log(error);
        res.redirect('/');
      } else if (!data[0]){
        res.send({msg: "아이디 또는 비밀번호를 확인해주세요!"});
      } else{
        var user = data[0];
        req.session.userID = id;
        req.session.username = user.name;
        req.session.login = 'login';
        res.redirect('/');
        console.log(req.session.login);
      }
    });
  })

  //Logout
  router.get('/logout', function(req, res){
    req.session.login = 'logout';
    res.status(200);
    res.redirect('/');
  })

  //signup
  router.get('/join', function(req, res){
    res.status(200);
    res.render('join', {
      url: req.url,
      login: req.session.login,
      username: req.session.username
    });
  })

  //signup Post
  router.post('/join', function(req, res){
    if(req.body.new_userPW == req.body.new_userPW_confirm){
      req.new_userID = req.body.new_userID;
      req.new_userPW = req.body.new_userPW;
      req.new_userName = req.body.new_userName;

      var queryString = 'INSERT INTO user (userid, name, password, salt) VALUES(?, ?, ?, ?)';
      var params = [req.body.new_userID, req.body.new_userName, req.body.new_userPW, '1234'];
      connection.query(queryString, params, function(err, rows) {
        if(err){
          console.log(err);
        }
      });
      res.redirect('/');
    } else{
      res.redirect('/');
    };
    res.status(200);
  })


  router.post('/snsRegister', function(req, res) {
    var twitter_id = req.body.twitterID;
    var twitter_pw = req.body.twitterPW;
    res.status(200);
    var queryString = 'UPDATE user SET twtid=?, twtpw=? WHERE userid=?';
    var params = [req.body.twitterID, req.body.twitterPW, req.session.userID];
    connection.query(queryString, params, function(err) {
      if(err){
        console.log(err);
      }
    });
    res.redirect('/');
  })


  router.get('/about', function(req, res){
    res.status(200);
    var wueryString = 'SELECT twtid FROM user WHERE userid=?';
    connection.query(queryString, req.session.userID, function(err, data){
      if(err){
        console.log(err);
      } else{
        res.render('about', {
          url: req.url,
          login: req.session.login,
          username: req.session.username,
          usertwtid: data
        });
      }
    });
    // res.render('about', {
    //   url: req.url,
    //   login: req.session.login,
    //   username: req.session.username
    // });
  })

  router.get('/blog1', function(req, res){
    res.status(200);
    res.render('blog-standard', {
      url: req.url,
      login: req.session.login,
      username: req.session.username
    });
  })

  router.get('/blog2', function(req, res){
    res.status(200);
    res.render('blog-single', {
      url: req.url,
      login: req.session.login,
      username: req.session.username
    });
  })

  return router;
};
