# -*- coding: utf-8 -*-

import re

# 입,출력 파일명
INPUT_FILE_NAME = 'result2.txt'
OUTPUT_FILE_NAME = 'result3.txt'

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
