module.exports = function (app) {
  var express = require('express');
  var router = express.Router();
  var mysql = require('mysql');
  var JSAlert = require("js-alert");
  var url = require('url');
  let {PythonShell} = require('python-shell');

  var craw_twt_userid = "from:@gradProject_WWJ";

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
    args : [craw_twt_userid]
  }



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
    res.redirect('/blog2');
  })


  router.post('/crawlingStart', function(req, res){
    //craw_twt_userid
    var queryString = 'SELECT twtid FROM user WHERE userid=?';
    connection.query(queryString, req.session.userID, function(err, rows){
      if(err){
        console.log(err);
      } else{
        //craw_twt_userid = rows[0].twtid;
        craw_twt_userid = "from:@"+rows[0].twtid;
        //console.log(craw_twt_userid);
        //console.log(rows[0].twtid);
        //from:@gradProject_WWJ

        //트위터 크롤러
        PythonShell.run('tweetcrawler.py', test_options, function(err, results){
          if(err) throw err;
          console.log(results);
        });
      }
    });
    res.redirect('/blog2');
  })


  router.get('/about', function(req, res){
    res.status(200);
    var queryString = 'SELECT twtid FROM user WHERE userid=?';
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
  })

  router.get('/blog1', function(req, res){
    res.status(200);

    var fst_val = 0.0000;
    var fst_emotion = 'none'
    var snd_val = 0.0000;
    var snd_emotion = 'none'
    var ant_emotion_value = 1;
    var joy_emotion_value = 1;
    var tru_emotion_value = 1;
    var fea_emotion_value = 1;
    var sur_emotion_value = 1;
    var sad_emotion_value = 1;
    var dis_emotion_value = 1;
    var ang_emotion_value = 1;
    var recom_title = 'none';
    var recom_artist = 'none';
    var recom_genre = 'none';
    var recom_url = 'none';
    var recom_mno = 0;
    var m_fst_emotion = 'none';
    var m_snd_emotion = 'none';
    var m_trd_emotion = 'none';
    var m_fst_val = 0.0000;
    var m_snd_val = 0.0000;
    var m_trd_val = 0.0000;

    var queryString = 'SELECT * FROM emotion WHERE userid=?';
    connection.query(queryString, req.session.userID, function(err, rows){
      if(err){
        console.log(err);
      } else {
          if(rows[0].ant > 0){
            if(fst_val<rows[0].ant){
              snd_val = fst_val;
              snd_emotion = fst_emotion;
              fst_val = rows[0].ant;
              fst_emotion = '기대';
            } else if(snd_val<rows[0].ant){
              snd_val = rows[0].ant;
              snd_emotion = '기대';
            }
            ant_emotion_value = rows[0].ant * 100;
          }
          if(rows[0].joy > 0){
            if(fst_val<rows[0].joy){
              snd_val = fst_val;
              snd_emotion = fst_emotion;
              fst_val = rows[0].joy;
              fst_emotion = '기쁨';
            } else if(snd_val<rows[0].joy){
              snd_val = rows[0].joy;
              snd_emotion = '기쁨';
            }
            joy_emotion_value = rows[0].joy * 100;
          }
          if(rows[0].tru > 0){
            if(fst_val<rows[0].tru){
              snd_val = fst_val;
              snd_emotion = fst_emotion;
              fst_val = rows[0].tru;
              fst_emotion = '신뢰';
            } else if(snd_val<rows[0].tru){
              snd_val = rows[0].tru;
              snd_emotion = '신뢰';
            }
            tru_emotion_value = rows[0].tru * 100;
          }
          if(rows[0].fea > 0){
            if(fst_val<rows[0].fea){
              snd_val = fst_val;
              snd_emotion = fst_emotion;
              fst_val = rows[0].fea;
              fst_emotion = '공포';
            } else if(snd_val<rows[0].fea){
              snd_val = rows[0].fea;
              snd_emotion = '공포';
            }
            fea_emotion_value = rows[0].fea * 100;
          }
          if(rows[0].sur > 0){
            if(fst_val<rows[0].sur){
              snd_val = fst_val;
              snd_emotion = fst_emotion;
              fst_val = rows[0].sur;
              fst_emotion = '놀람';
            } else if(snd_val<rows[0].sur){
              snd_val = rows[0].sur;
              snd_emotion = '놀람';
            }
            sur_emotion_value = rows[0].sur * 100;
          }
          if(rows[0].sad > 0){
            if(fst_val<rows[0].sad){
              snd_val = fst_val;
              snd_emotion = fst_emotion;
              fst_val = rows[0].sad;
              fst_emotion = '슬픔';
            } else if(snd_val<rows[0].sad){
              snd_val = rows[0].sad;
              snd_emotion = '슬픔';
            }
            sad_emotion_value = rows[0].sad * 100;
          }
          if(rows[0].dis > 0){
            if(fst_val<rows[0].dis){
              snd_val = fst_val;
              snd_emotion = fst_emotion;
              fst_val = rows[0].dis;
              fst_emotion = '혐오';
            } else if(snd_val<rows[0].dis){
              snd_val = rows[0].dis;
              snd_emotion = '혐오';
            }
            dis_emotion_value = rows[0].dis * 100;
          }
          if(rows[0].ang > 0){
            if(fst_val<rows[0].ang){
              snd_val = fst_val;
              snd_emotion = fst_emotion;
              fst_val = rows[0].ang;
              fst_emotion = '분노';
            } else if(snd_val<rows[0].ang){
              snd_val = rows[0].ang;
              snd_emotion = '분노';
            }
            ang_emotion_value = rows[0].ang * 100;
          }
        } //else

        queryString2 = 'SELECT * FROM music_emotion';
        connection.query(queryString2, function(err2, rows2){
          if(err2){
            console.log("here");
            console.log(err2);
          } else{
            for(var i = 0; i < rows2.length; i++){
              if(rows2[i].ant > 0){
                if(m_fst_val<rows2[i].ant){
                  console.log("here1");
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = m_fst_val;
                  m_snd_emotion = m_fst_emotion;
                  m_fst_val = rows2[i].ant;
                  m_fst_emotion = '기대';
                  recom_mno = rows2[i].mno;
                } else if(m_snd_val<rows2[i].ant){
                  console.log("here2");
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = rows2[i].ant;
                  m_snd_emotion = '기대';
                } else if(m_trd_val<rows2[i].ant){
                  console.log("here3");
                  m_trd_val = rows2[i].ant;
                  m_trd_emotino = '기대';
                }
              }
              if(rows2[i].joy > 0){
                if(m_fst_val<rows2[i].joy){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = m_fst_val;
                  m_snd_emotion = m_fst_emotion;
                  m_fst_val = rows2[i].joy;
                  m_fst_emotion = '기쁨';
                  recom_mno = rows2[i].mno;
                } else if(m_snd_val<rows2[i].joy){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = rows2[i].joy;
                  m_snd_emotion = '기쁨';
                } else if(m_trd_val<rows2[i].joy){
                  m_trd_val = rows2[i].joy;
                  m_trd_emotino = '기쁨';
                }
              }
              if(rows2[i].tru > 0){
                if(m_fst_val<rows2[i].tru){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = m_fst_val;
                  m_snd_emotion = m_fst_emotion;
                  m_fst_val = rows2[i].tru;
                  m_fst_emotion = '신뢰';
                  recom_mno = rows2[i].mno;
                } else if(m_snd_val<rows2[i].tru){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = rows2[i].tru;
                  m_snd_emotion = '신뢰';
                } else if(m_trd_val<rows2[i].tru){
                  m_trd_val = rows2[i].tru;
                  m_trd_emotino = '신뢰';
                }
              }
              if(rows2[i].fea > 0){
                if(m_fst_val<rows2[i].fea){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = m_fst_val;
                  m_snd_emotion = m_fst_emotion;
                  m_fst_val = rows2[i].fea;
                  m_fst_emotion = '공포';
                  recom_mno = rows2[i].mno;
                } else if(m_snd_val<rows2[i].fea){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = rows2[i].fea;
                  m_snd_emotion = '공포';
                } else if(m_trd_val<rows2[i].fea){
                  m_trd_val = rows2[i].fea;
                  m_trd_emotino = '공포';
                }
              }
              if(rows2[i].sur > 0){
                if(m_fst_val<rows2[i].sur){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = m_fst_val;
                  m_snd_emotion = m_fst_emotion;
                  m_fst_val = rows2[i].sur;
                  m_fst_emotion = '놀람';
                  recom_mno = rows2[i].mno;
                } else if(m_snd_val<rows2[i].sur){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = rows2[i].sur;
                  m_snd_emotion = '놀람';
                } else if(m_trd_val<rows2[i].sur){
                  m_trd_val = rows2[i].sur;
                  m_trd_emotino = '놀람';
                }
              }
              if(rows2[i].sad > 0){
                if(m_fst_val<rows2[i].sad){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = m_fst_val;
                  m_snd_emotion = m_fst_emotion;
                  m_fst_val = rows2[i].sad;
                  m_fst_emotion = '슬픔';
                  recom_mno = rows2[i].mno;
                } else if(m_snd_val<rows2[i].sad){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = rows2[i].sad;
                  m_snd_emotion = '슬픔';
                } else if(m_trd_val<rows2[i].sad){
                  m_trd_val = rows2[i].sad;
                  m_trd_emotino = '슬픔';
                }
              }
              if(rows2[i].dis > 0){
                if(m_fst_val<rows2[i].dis){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = m_fst_val;
                  m_snd_emotion = m_fst_emotion;
                  m_fst_val = rows2[i].dis;
                  m_fst_emotion = '혐오';
                  recom_mno = rows2[i].mno;
                } else if(m_snd_val<rows2[i].dis){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = rows2[i].dis;
                  m_snd_emotion = '혐오';
                } else if(m_trd_val<rows2[i].dis){
                  m_trd_val = rows2[i].dis;
                  m_trd_emotino = '혐오';
                }
              }
              if(rows2[i].ang > 0){
                if(m_fst_val<rows2[i].ang){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = m_fst_val;
                  m_snd_emotion = m_fst_emotion;
                  m_fst_val = rows2[i].ang;
                  m_fst_emotion = '분노';
                  recom_mno = rows2[i].mno;
                } else if(m_snd_val<rows2[i].ang){
                  m_trd_val = m_snd_val;
                  m_trd_emotion = m_snd_emotion;
                  m_snd_val = rows2[i].ang;
                  m_snd_emotion = '분노';
                } else if(m_trd_val<rows2[i].ang){
                  m_trd_val = rows2[i].ang;
                  m_trd_emotino = '분노';
                }
              }
            } //for
          } //else
        });
        // queryString3 = 'SELECT * FROM music WHERE mno=?';
        // connection.query(queryString3, recom_mno, function(err3, rows3){
        //   if(err3){
        //     console.log(err3);
        //   } else{
        //     recom_title = rows3[0].title;
        //     recom_artist = rows3[0].artist;
        //     recom_genre = rows3[0].genre;
        //     recom_url = rows3[0].url;
        //   } //else
        // });
        res.render('blog-standard', {
          url: req.url,
          login: req.session.login,
          username: req.session.username,
          user_sentiment1: fst_emotion,
          user_sentiment2: snd_emotion,
          ant_val: ant_emotion_value,
          joy_val: joy_emotion_value,
          tru_val: tru_emotion_value,
          fea_val: fea_emotion_value,
          sur_val: sur_emotion_value,
          sad_val: sad_emotion_value,
          dis_val: dis_emotion_value,
          ang_val: ang_emotion_value,
          recom_mno: recom_mno,recom_1: m_fst_emotion,
          recom_title: recom_title,
          recom_artist: recom_artist,
          recom_genre: recom_genre,
          recom_url: recom_url
        });
    });
  })

  router.get('/blog2', function(req, res){
    res.status(200);
    var queryString = 'SELECT twtid FROM user WHERE userid=?';
    connection.query(queryString, req.session.userID, function(err, rows){
      if(err){
        console.log(err);
      } else{
        res.render('blog-single', {
          url: req.url,
          login: req.session.login,
          username: req.session.username,
          usertwtid: rows[0].twtid
        });
      }
    });
  })

  return router;
};
