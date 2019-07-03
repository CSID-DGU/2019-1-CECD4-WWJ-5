module.exports = function (app) {
  var express = require('express');
  var router = express.Router();
  var JSAlert = require("js-alert");
  var url = require('url');
  var dateFormat = require('dateformat');
  var crypto = require('crypto');

  router.get('/', function(req, res){
    res.status(200);
    res.render('index');
  })

  router.get('/about', function(req, res){
    res.status(200);
    res.render('about');
  })

  router.get('/blog1', function(req, res){
    res.status(200);
    res.render('blog-standard');
  })

  router.get('/blog2', function(req, res){
    res.status(200);
    res.render('blog-single');
  })

  return router;
};
