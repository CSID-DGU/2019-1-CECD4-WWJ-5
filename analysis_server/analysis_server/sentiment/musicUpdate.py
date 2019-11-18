# -*- coding: utf-8 -*-
# mysql 모듈 부르기
import pymysql
import pandas as pd
import csv

def db_update(sent_score, emot_score, musicTitle, musicNum, musicArtist):
    #1. MySQL 서버 연결
    conn = pymysql.connect(host="15.164.93.189",
                                port=3306,
                                user="analysis_server",
                                password="1234",
                                db="wwj")

    #user 데이터 존재할 때 극성분석 업데이트 쿼리
    checkquery = "select * from music_emotion WHERE title = %s"

    query = "update music_sentiment set POS = %s, NEG = %s, NEUT = %s, COMP = %s, NONE = %s WHERE title = %s"
    query2 = "update music_emotion set ant = %s, joy = %s, tru = %s, fea = %s, sur = %s, sad = %s, dis = %s, ang = %s WHERE title = %s"

    insertquery= "insert into music_sentiment (POS, NEG, NEUT, COMP, NONE, title, artist, mno) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
    insertquery2= "insert into music_emotion (ant, joy, tru, fea, sur, sad, dis, ang, title, artist, mno) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

    curs = conn.cursor()

    try :
        curs.execute(checkquery,(musicTitle))
        rows = curs.fetchall()
        conn.commit()
        print(rows)

        if not(rows):
            curs.execute(insertquery,(sent_score['POS'],sent_score['NEG'], sent_score['NEUT'] , sent_score['COMP'], sent_score['None'], musicTitle , musicArtist, musicNum))
            curs.execute(insertquery2,(emot_score['ant'],emot_score['joy'], emot_score['tru'], emot_score['fea'], emot_score['sur'], emot_score['sad'], emot_score['dis'], emot_score['ang'], musicTitle, musicArtist, musicNum))
            conn.commit()
            print("\n")

        else:
            curs.execute(query,(sent_score['POS'] ,sent_score['NEG'], sent_score['NEUT'],sent_score['COMP'], sent_score['None'], musicTitle))
            curs.execute(query2,(emot_score['ant'],emot_score['joy'],emot_score['tru'], emot_score['fea'], emot_score['sur'], emot_score['sad'], emot_score['dis'], emot_score['ang'], musicTitle))
            conn.commit()


    except pymysql.Error as e:
        print("Error %d: %s" % (e.args[0],e.args[1]))


    finally:
        curs.close()
        conn.close()
