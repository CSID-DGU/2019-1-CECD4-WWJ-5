module.exports = function (app) {

  var express = require('express');
  var router = express.Router();
    var mysql = require('mysql');
  var JSAlert = require("js-alert");
  var url = require('url');
  //var dateFormat = require('dateformat');
  //var crypto = require('crypto');

  var connection = mysql.createConnection({
      host: "localhost", //서버 로컬 IP
      user: "root", //계정 아이디
      password: "1234", //계정 비밀번호
      database: "wwj" //접속할 DB
  })

  router.get('/', function(req, res){
    res.status(200);
    res.render('index', {
			url: req.url,
      login: req.session.login,
      userid: req.session.userID,
      username: req.session.username,
			authority: req.session.authority
    });
  })

  router.get('/login', function(req, res){
    res.status(200);
    res.render('login', {
      url: req.url,
      login: req.session.login,
      userid: req.session.userID,
      username: req.session.username,
			authority: req.session.authority
    });
  })

  router.post('/login', function(req, res){
    var id = req.body.inputId;
    var pw = req.body.inputPassword;
    res.status(200);
    var queryString = 'select * from user where userid=? and password=?'
		connection.query(queryString, [id, pw], function (error2, data) {
			if (error2) {
				console.log(error2);
				res.redirect('/');
			} else if (!data[0]) {
				res.send({ msg: "아이디 또는 비밀번호를 확인해주세요!" });
			} else {
				var user = data[0];
				req.session.userID = id;
				req.session.username = user.username;
				req.session.authority = user.auth;
				req.session.login = 'login';
				res.redirect('/');
				console.log(req.session.login);
			}
		});
  })

  router.get('/about', function(req, res){
    res.status(200);
    res.render('about', {
      url: req.url,
      login: req.session.login,
      userid: req.session.userID,
      username: req.session.username,
			authority: req.session.authority
    });
  })

  router.get('/blog1', function(req, res){
    res.status(200);
    res.render('blog-standard', {
      url: req.url,
      login: req.session.login,
      userid: req.session.userID,
      username: req.session.username,
			authority: req.session.authority
    });
  })

  router.get('/blog2', function(req, res){
    res.status(200);
    res.render('blog-single', {
      url: req.url,
      login: req.session.login,
      userid: req.session.userID,
      username: req.session.username,
			authority: req.session.authority
    });
  })

  //Logout
  router.get('/logout', function(req, res){
    req.session.login = 'logout';
    res.status(200);
    res.redirect('/');
  })

  //sign up
  router.get('/join', function(req, res){
    res.status(200);
    res.render('join', {
      url: req.url,
      login: req.session.login,
      userid: req.session.userID,
      username: req.session.username,
			authority: req.session.authority
    });
  })

  //Sign up Post
	router.post('/join', function (req, res) {
		if (req.body.new_userPW == req.body.new_userPW_confirm) {
			req.new_userID = req.body.new_userID;
			req.new_userPW = req.body.new_userPW;
			req.new_userName = req.body.new_userName;

			var queryString = 'INSERT INTO user (userid, name, password, salt) VALUES(?, ?, ?, ?, ?)';
			var params = [req.body.new_userID, req.body.new_userName, req.body.new_userPW, '1234'];
			connection.query(queryString, params, function (err, rows) {
				if (err) {
					console.log(err);
				}
			});
			res.redirect('/');
		} else {
			res.redirect('/');
		};
		res.status(200);
	})

  return router;
};
