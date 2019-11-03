# -*- coding: utf-8 -*-
# mysql 모듈 부르기
import pymysql
import pandas as pd
import csv

def db_update(sent_score, emot_score, userid):
    #1. MySQL 서버 연결
    conn = pymysql.connect(host="15.164.93.189",
                                port=3306,
                                user="analysis_server",
                                password="1234",
                                db="wwj")

    #user 데이터 존재할 때 극성분석 업데이트 쿼리
    query = "update sentiment set (POS, NEG, NEUT, COMP, NONE) values ('%f', '%f', '%f', '%f', '%f') WHERE userid = '%s'"%(sent_score['POS'] ,sent_score['NEG'], sent_score['NEUT'],sent_score['COMP'], sent_score['None'], userid )
    query2 = "update emotion set (ant, joy, tru, fea, sur, sad, dis, ang, none) values ('%f', '%f', '%f', '%f', '%f', '%f', '%f', '%f', '%f') WHERE userid = '%s'"%(emot_score['ant'] ,emot_score['joy'], emot_score['tru'], emot_score['fea'], emot_score['sur'], emot_score['sad'], emot_score['dis'], emot_score['ang'], emot_score['none'], userid)

    curs = conn.cursor()
    try :
        curs.execute(query)
        curs.execute(query2)


    except pymysql.Error as e:
        print("Error %d: %s" % (e.args[0],e.args[1]))
    finally:
        curs.close()
        conn.close()
