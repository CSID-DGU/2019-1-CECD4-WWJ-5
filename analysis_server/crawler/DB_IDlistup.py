# -*- coding: utf-8 -*-
# mysql 모듈 부르기
import pymysql
import pandas as pd
import csv
#1. MySQL 서버 연결
conn = pymysql.connect(host="15.164.93.189",
                            port=3306,
                            user="analysis_server",
                            password="1234",
                            db="wwj")

query = "select userid, twtid from user"
curs = conn.cursor()

try :
    df = pd.read_sql_query(query,conn)
    df.to_csv('users_output.csv', index=False)
    f= open('users_output.csv','r')
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
