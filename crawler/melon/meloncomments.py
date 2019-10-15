# -*- coding: utf-8 -*-

import re
import requests
from bs4 import BeautifulSoup

headers = {
    'User-Agent': ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                       '(KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36')
    }

#User-Agent가 없으면 사이트로 접근이 되지 않았다. 따라서 headers를 넣어준다.

melonmusic ="https://www.melon.com/album/detail.htm?albumId=10137250"
html = requests.get(melonmusic, headers = headers)
print(html)
soup = BeautifulSoup(html.text, "html.parser")

tags = soup.body.find("script", {"type":"application/ld+json"})

print(tags)

file = open('result1.txt', 'w')
file.write(str(tags))
file.close()
