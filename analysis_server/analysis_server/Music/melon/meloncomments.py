# -*- coding: utf-8 -*-

import re
import requests
from bs4 import BeautifulSoup

headers = {
    'User-Agent': ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                       '(KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36')
    }

#User-Agent가 없으면 사이트로 접근이 되지 않았다. 따라서 headers를 넣어준다.

melonmusic ="https://www.melon.com/album/detail.htm?albumId=2173025"
html = requests.get(melonmusic, headers = headers)
print(html)
soup = BeautifulSoup(html.text, "html.parser")

tags = soup.body.find("script", {"type":"application/ld+json"})

#print(tags)

file = open('5_melon.txt', 'w')
file.write(str(tags))
file.close()

with open("5_melon_processed.txt", "w") as fi:
    with open("5_melon.txt", 'r') as f:
        line_data = f.read()
        start = line_data.find('description\": \"')
        start = start + 15
        end = line_data.find('\"potentialAction')
        fi.write(line_data[start:end])



# 입,출력 파일명
INPUT_FILE_NAME = '5_melon_processed.txt'
OUTPUT_FILE_NAME = '5_melon_result.txt'

def clean_text(text):
    cleaned_text = re.sub('&lt;/strong&gt;' , '', text)
    cleaned_text = re.sub('&lt;/div&gt;','', cleaned_text)
    cleaned_text = re.sub('&amp;lsquo;','', cleaned_text)
    cleaned_text = re.sub('&lt;strong&gt;','', cleaned_text)
    cleaned_text = re.sub('&lt;div&gt;	','', cleaned_text)
    cleaned_text = re.sub('&amp;nbsp;','', cleaned_text)
    cleaned_text = re.sub('&amp;rsquo; ','', cleaned_text)
    cleaned_text = re.sub('&amp;rsquo;','', cleaned_text)
    cleaned_text = re.sub('&amp;#39;','', cleaned_text)
    cleaned_text = re.sub('&lt;br /&gt;	','', cleaned_text)
    cleaned_text = re.sub('&lt;','', cleaned_text)
    cleaned_text = re.sub('&quot;','', cleaned_text)
    cleaned_text = re.sub('b&gt;','', cleaned_text)
    cleaned_text = re.sub('br&gt;','', cleaned_text)
    cleaned_text = re.sub('p&gt;','', cleaned_text)
    cleaned_text = re.sub('quot;','', cleaned_text)
    cleaned_text = re.sub('&amp;','', cleaned_text)
    return cleaned_text

# 메인 함수
def main():
    read_file = open(INPUT_FILE_NAME, 'r')
    write_file = open(OUTPUT_FILE_NAME, 'w')
    text = read_file.read()
    text = clean_text(text)
    write_file.write(text)
    read_file.close()
    write_file.close()

if __name__ == "__main__":
    main()
