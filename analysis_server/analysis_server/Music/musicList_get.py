# 예제 코드1: 검색 키워드를 활용한 트위터 게시글 단순 검색
import sys
import tweepy
#로그인 되어 있는 아이디를 통해 twitter id db에서 select 후 keyword에 저장
import csv



def get_music_list():
    line_counter = 0
    header = []
    temp_user = []
    with open('/home/wwj/analysis_server/Music/musiclist_output.csv','r') as f:
        while 1:
            data = f.readline()
            if not data: break
            data = data.replace("\r","").replace("\n","")
            if line_counter == 0:
                header = data.split("\t")
            else:
                temp_user.append(data.split("\t"))
            line_counter += 1

    return temp_user
