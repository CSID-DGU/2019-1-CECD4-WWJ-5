with open("result2.txt", "w") as fi:
    with open("result1.txt", 'r') as f:
        line_num = 1
        line_data = f.readline()
        while line_data:
            start = line_data.find('&lt;strong&gt;')
            end = line_data.find('&lt;/div&gt;",')
            fi.write(line_data[start:end])
            line_data = f.readline()
            line_num += 1
