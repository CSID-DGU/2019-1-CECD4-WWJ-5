# encoding: utf-8
import csv
import logging

from konlpy import jvm
from konlpy.tag import Twitter

logger = logging.getLogger(__name__)


def main():
    """
        konlpy 사용시 주의 사항
        자바 설치 및 세팅 필요
        JAVA_HOME 세팅이 필요합니다.
        export JAVA_HOME=$(/usr/libexec/java_home)
    """
    konl = Twitter()
    file_path = '/Users/bongster/Downloads/20160528_jiana.csv'
    with open(file_path, 'rb') as csv_file:
        inforeader = csv.reader(csv_file)
        for row in inforeader:
            r = konl.pos(unicode(row[4], 'utf-8'), norm=True, stem=True)
            print '=' * 20
            for txt, post in r:
                print txt, post
            print '=' * 20


if __name__ == '__main__':
    jvm.init_jvm()
    main()
