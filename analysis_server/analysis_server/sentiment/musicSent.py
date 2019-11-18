from __future__ import division

import time
import re
import matplotlib.pyplot as pyplot
import pandas as pd
import requests
import json

from konlpy.tag import Kkma


def preprocessor(text):
    text = text.rstrip().lstrip()
    return re.sub('[/[\{\}\[\]\/?|\)*~`!\-_+<>@\#$%&\\\=\(\'\"]+', '', text)  # remove special chars

def scores_to_percentiles(scores):
    sum_of_scores = sum(scores.values())

    for category in scores:
        scores[category] = scores[category] / sum_of_scores

    return scores


def analyze_sentences_into_chunks(sentences):

    kkma = Kkma()

    analyzed_words = []

    for s in sentences:
        s = preprocessor(s)
        analyzed_in_dicts = kkma.pos(s)
        tmp = []

        for word in analyzed_in_dicts:
            tmp.append("/".join(word))
        analyzed_words.append(";".join(tmp))

    return analyzed_words


def categorize_word_chunks(chunks, lexicons):
    scores = {'POS': 0, 'NEG': 0, 'NEUT': 0, 'COMP': 0, 'None': 0}
    for chunk in chunks:
        for index, row in lexicons.iterrows():
            if row['ngram'] in chunk:
                scores['POS'] += row['POS']
                scores['NEG'] += row['NEG']
                scores['NEUT'] += row['NEUT']
                scores['COMP'] += row['COMP']
                scores['None'] += row['None']

    return scores_to_percentiles(scores)

def music_sentiment_analysis(sentiment_data_frame, musicNum):
    # Get data and Read files
    raw_data = open('/home/wwj/analysis_server/Music/music_data/%s_comb_music_data.txt'%(musicNum),encoding='utf-8')
    # raw_data = open('resources/example.txt', encoding='utf-8')

    # Split sentences to chunks
    word_chunks = analyze_sentences_into_chunks(raw_data)
    raw_data.close()

    # Analyze sentiments from chunks and polarity data frame
    categorized_scores = categorize_word_chunks(word_chunks, sentiment_data_frame)
    del(word_chunks)
    print('Sentiment Score for %s'%(musicNum))
    print ('POS : %f, NEG : %f, NEUT : %f' %(categorized_scores['POS'] ,categorized_scores['NEG'], categorized_scores['NEUT']))

    return categorized_scores
