import tweepy

# 트위터 Consumer Key (API Key)
consumer_key = ""
# 트위터 Consumer Secret (API Secret)
consumer_secret = ""

# 트위터 Access Token
access_token = ""
# 트위터 Access Token Secret
access_token_secret=""

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

public_tweets = api.home_timeline()
for tweet in public_tweets:
    print(tweet.text)
