# WWJ
컴퓨터공학종합설계1 - WWJ팀

# Youtube Crawler
https://github.com/egbertbouman/youtube-comment-downloader

### Dependencies
* Python 2.7+
* requests
* lxml
* cssselect

The python packages can be installed with

    pip install requests
    pip install lxml
    pip install cssselect

### Usage
```
usage: downloader.py [--help] [--youtubeid YOUTUBEID] [--output OUTPUT]

Download Youtube comments without using the Youtube API

optional arguments:
  --help, -h            Show this help message and exit
  --youtubeid YOUTUBEID, -y YOUTUBEID
                        ID of Youtube video for which to download the comments
  --output OUTPUT, -o OUTPUT
                        Output filename (output format is line delimited JSON)
```
