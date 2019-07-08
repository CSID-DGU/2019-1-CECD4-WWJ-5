﻿# 예제 코드1: 검색 키워드를 활용한 트위터 게시글 단순 검색

import tweepy
import sys

# 트위터 Consumer Key (API Key)
consumer_key = ""
# 트위터 Consumer Secret (API Secret)
consumer_secret = ""

# 1차 인증: 개인 앱 정보
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

# 트위터 Access Token
access_token = ""
# 트위터 Access Token Secret
access_token_secret= ""

# 2차 인증: 토큰 정보
auth.set_access_token(access_token, access_token_secret)

# 3. twitter API 생성
api = tweepy.API(auth)

keyword = "from:@gradProject_WWJ";     # 검색할 키워드

tweets = api.search(keyword, count = 20) # 한 번에 15 트윗 검색 정보를 가져옴

# tweets = api.search(keyword, count=100) # 일반 계정으로는 최대 100개 최신 게시물을 가져올 수 있음
for num, tweet in enumerate(tweets):
    print(num, "]", tweet.text)
    #print (tweet.favorite_count)
    #print (tweet.retweet_count)
