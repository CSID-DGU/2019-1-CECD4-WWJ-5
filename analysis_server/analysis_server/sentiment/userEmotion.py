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
    scores = {'ant': 0, 'joy': 0, 'tru': 0, 'fea': 0, 'sur': 0, 'sad': 0, 'dis': 0, 'ang': 0}
    for chunk in chunks:
        for index, row in lexicons.iterrows():
            if row['ngram'] in chunk:
                scores['ant'] += row['ant']
                scores['joy'] += row['joy']
                scores['tru'] += row['tru']
                scores['fea'] += row['fea']
                scores['sur'] += row['sur']
                scores['sad'] += row['sad']
                scores['dis'] += row['dis']
                scores['ang'] += row['ang']

    return scores_to_percentiles(scores)

def user_emotion_analysis(emotion_data_frame, userid):
    # Get data and Read files
#    raw_data = open('/home/wwj/analysis_server/member_data/output_twitter_%s.txt'%(userid),encoding='utf-8')
    raw_data = open('/home/wwj/analysis_server/Music/lyrics/2_lyrics.txt',encoding='utf-8')

    # raw_data = open('resources/example.txt', encoding='utf-8')

    # Split sentences to chunks
    word_chunks = analyze_sentences_into_chunks(raw_data)
    raw_data.close()

    # Analyze sentiments from chunks and polarity data frame
    categorized_scores = categorize_word_chunks(word_chunks, emotion_data_frame)
    del(word_chunks)

    print('Emotion Score for %s'%(userid))
    print ('ant : %f, joy : %f, tru : %f, fea : %f, sur : %f, sad : %f, dis : %f, ang : %f'  %(categorized_scores['ant'] ,categorized_scores['joy'], categorized_scores['tru'], categorized_scores['fea'], categorized_scores['sur'], categorized_scores['sad'], categorized_scores['dis'], categorized_scores['ang']))

    return categorized_scores
