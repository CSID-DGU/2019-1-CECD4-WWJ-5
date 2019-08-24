#pip install --upgrade pip
#pip install konlpy

from konlpy.tag import Okt

okt = Okt()
print(okt.pos("주연이는 바보다!"))
