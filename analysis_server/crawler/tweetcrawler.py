# 예제 코드1: 검색 키워드를 활용한 트위터 게시글 단순 검색
import sys
import tweepy
#로그인 되어 있는 아이디를 통해 twitter id db에서 select 후 keyword에 저장
import csv



def get_user_list():
    line_counter = 0
    header = []
    temp_user = []
    with open('/home/wwj/analysis_server/user_list/users_output.csv','r') as f:
        while 1:
            data = f.readline()
            if not data: break
            data = data.replace("\r","").replace("\n","")
            if line_counter == 0:
                header = data.split(",")
            else:
                temp_user.append(data.split(","))
            line_counter += 1

    return temp_user

def crawling_process(user_list):

    for x,y in user_list:

        # 트위터 Consumer Key (API Key)
        consumer_key = "mNqogB73qLjUjHgYRpVmNw8M5"
        # 트위터 Consumer Secret (API Secret)
        consumer_secret = "yUOSN3eng39OH1gdalVR7vgyGbv36Isi5e5aJG4mXJfq0NPG4r"

        # 1차 인증: 개인 앱 정보
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)



        # 트위터 Access Token
        access_token = "1132628802750668801-tGo29pPNwk38mddJfdDrO5TAIYw5YR"
        # 트위터 Access Token Secret
        access_token_secret="7qElEOk7BQxOu6bP3bTOdEMc9QZg1qt8qFkzWWiReCtQ0"

        # 2차 인증: 토큰 정보
        auth.set_access_token(access_token, access_token_secret)

        # 3. twitter API 생성
        api = tweepy.API(auth)

        keyword = 'from:@' + y

        tweets = api.search(keyword, count = 20) # 한 번에 15 트윗 검색 정보를 가져옴

        # tweets = api.search(keyword, count=100) # 일반 계정으로는 최대 100개 최신 게시물을 가져올 수 있음
        with open("/home/wwj/analysis_server/member_data/output_twitter_%s.txt" % (x) , "w", encoding="utf8") as f:
            for num, tweet in enumerate(tweets):
                f.write(tweet.text)
                print(num, "]", tweet.text)
