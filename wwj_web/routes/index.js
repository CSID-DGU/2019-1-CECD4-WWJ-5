module.exports = function (app) {
  var express = require('express');
  var router = express.Router();
  var JSAlert = require("js-alert");
  var url = require('url');
  var dateFormat = require('dateformat');
  var crypto = require('crypto');

  router.get('/', function(req, res){
    res.status(200);
    res.render('index', {
			url: req.url,
      login: req.session.login,
      userid: req.session.userID,
    });
  })

  return router;
};
