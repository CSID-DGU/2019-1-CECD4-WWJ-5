# 예제 코드1: 검색 키워드를 활용한 트위터 게시글 단순 검색
import sys
import tweepy

# 트위터 Consumer Key (API Key)
consumer_key = "ZbvmWBYhsBSveLK8FX6Qk8izY"
# 트위터 Consumer Secret (API Secret)
consumer_secret = "UbvVBVPJeZm2dYpzh4RihweJf0UJ8H7cB6PqTexKAdTOXkd795"

# 1차 인증: 개인 앱 정보
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

# 트위터 Access Token
access_token = "1132628802750668801-3T4hnbbalhNIelpvuvYIEGpUCAxKyi"
# 트위터 Access Token Secret
access_token_secret="D0bbSMh6GEoEItPXBmzWUMebbz5riOJg0wCjTYcpLmXrj"

# 2차 인증: 토큰 정보
auth.set_access_token(access_token, access_token_secret)

# 3. twitter API 생성
api = tweepy.API(auth)

keyword = sys.argv[1];     # 검색할 키워드

tweets = api.search(keyword, count = 20) # 한 번에 15 트윗 검색 정보를 가져옴

# tweets = api.search(keyword, count=100) # 일반 계정으로는 최대 100개 최신 게시물을 가져올 수 있음
with open("./output_twitter.txt", "w", encoding="utf8") as f:
    for num, tweet in enumerate(tweets):
        f.write(tweet.text)
        print(num, "]", tweet.text)
        #print (tweet.favorite_count)
        #print (tweet.retweet_count)
