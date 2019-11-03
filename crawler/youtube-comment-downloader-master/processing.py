with open("5_processed.txt", "w") as fi:
    with open("5_ansi.txt", 'r') as f:
        line_num = 1
        line_data = f.readline()
        while line_data:
            start = line_data.find('text\": \"')
            start = start + 8
            end = line_data.find('\", \"time\"')
            fi.write(line_data[start:end])
            line_data = f.readline()
            line_num += 1
