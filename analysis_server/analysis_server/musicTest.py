import pandas as pd
import time
import os

from Music import musicList_get
from Music import DB_Musiclist
from Music import musicData_comb
from sentiment import musicEmotion
from sentiment import musicSent
from sentiment import musicUpdate


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

        DB_Musiclist.music_db_connect()

        music_lists = musicList_get.get_music_list()



        for x,y,z in music_lists:
            print("Processing music %s"%y)

            mSentiment_Score = musicSent.music_sentiment_analysis(sentiment_data_frame,y)
            mEmotion_Score = musicEmotion.music_emotion_analysis(emotion_data_frame,y)

            print (mSentiment_Score)
            print (mEmotion_Score)

            musicUpdate.db_update(mSentiment_Score, mEmotion_Score, x,y,z)
            print ("Update music %s completed\n\n"%y)
