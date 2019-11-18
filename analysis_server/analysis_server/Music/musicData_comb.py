import os


def combine_music_data(musicNum):
    outfile_name="/home/wwj/analysis_server/Music/music_data/%s_comb_music_data.txt"%(musicNum)
    out_file = open(outfile_name,"w")

    with open("/home/wwj/analysis_server/Music/lyrics/%s_lyrics.txt"% (musicNum), "r",encoding="utf8") as lyric:
        for line in lyric:
            out_file.write(line)
        out_file.write("\n\n")

    lyric.close()

    with open("/home/wwj/analysis_server/Music/melon/%s_melon_result.txt"% (musicNum), "r",encoding="utf8") as melon:
        for line in melon:
            out_file.write(line)
        out_file.write("\n\n")
    melon.close()

    with open("/home/wwj/analysis_server/Music/youtube-comment-downloader-master/%s_processed.txt"% (musicNum), "r",encoding="CP949") as youtube:
        for line in youtube:
            out_file.write(line)
        out_file.write("\n\n")
    youtube.close()

    out_file.close()
