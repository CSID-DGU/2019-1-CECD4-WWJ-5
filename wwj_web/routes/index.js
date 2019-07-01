module.exports = function(app){
  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');

  var connection = mysql.createConnection({
      host: "localhost", //서버 로컬 IP
      user: "root", //계정 아이디
      password: "1234", //계정 비밀번호
      database: "wwj" //접속할 DB
  })
}
