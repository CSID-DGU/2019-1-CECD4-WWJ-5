import pandas as pd
import time
import os

from crawler import tweetcrawler
from user_list import DB_IDlistup
from sentiment import Main
from sentiment import emotion
from multiprocessing import Process



#try 이용 처음 user들의 data를 갖고오기
#이 후엔 새로운 database 내에 수정사항이 있을 경우 trigger가 되어 실행할 수 있는 thread 생성

#---
#크롤링 업로드+데이터 분석 쓰레드 (각 멤버별로 나눠서 진행)


if __name__ == '__main__':

    sentiment_data_frame = pd.read_csv('sentiment/lexicon/polarity.csv')
    emotion_data_frame = pd.read_csv('sentiment/lexicon/emotion-dictionary-wwj.csv')
    type_data_frame = pd.read_csv('sentiment/lexicon/subjectivity-type.csv')
    intensity_data_frame = pd.read_csv('sentiment/lexicon/intensity.csv')

    while True:


        DB_IDlistup.user_db_connect()

        user_lists = tweetcrawler.get_user_list()


        tweetcrawler.crawling_process(user_lists)

        for x,y in user_lists:
            Main.user_sentiment_analysis(sentiment_data_frame, x)
            emotion.user_emotion_analysis(emotion_data_frame,x)


        time.sleep(30)
