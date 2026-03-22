import json

with open('/Users/ben/Documents/theology/shavat/lib/john.json', 'r') as f:
    data = json.load(f)

for chapter_data in data['chapters']:
    chapter_num = chapter_data['chapter']
    verse_count = len(chapter_data['verses'])
    print(f"{chapter_num}:{verse_count}")
