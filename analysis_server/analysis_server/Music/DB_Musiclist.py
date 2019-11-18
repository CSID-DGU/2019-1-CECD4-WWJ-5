# -*- coding: utf-8 -*-
# mysql 모듈 부르기
import pymysql
import pandas as pd
import csv

def music_db_connect():
    #1. MySQL 서버 연결
    conn = pymysql.connect(host="15.164.93.189",
                                port=3306,
                                user="analysis_server",
                                password="1234",
                                db="wwj")

    query = "select title, mno, artist from music"
    curs = conn.cursor()
    try :
        df = pd.read_sql_query(query,conn)
        df.to_csv('/home/wwj/analysis_server/Music/musiclist_output.csv', sep="\t",index=False)
        f= open('/home/wwj/analysis_server/Music/musiclist_output.csv','r')
        rdr=csv.reader(f)
        for line in rdr:
            print(line)
        f.close()

        #curs.execute(query)
        #conn.commit()
        #rows = curs.fetchall()
        #print(rows)
    except pymysql.Error as e:
        print("Error %d: %s" % (e.args[0],e.args[1]))
    finally:
        curs.close()
        conn.close()
