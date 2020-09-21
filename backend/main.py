import spacy
import testtext
import sys
import datetime
from dateutil.parser import parse
from mdutils.mdutils import MdUtils

def contains_multiple_words(s):
  return len(s.split()) > 1

def has_prefix(text, prefix):
  return text.startswith(prefix)

def remove_prefix(text, prefix):
    return text[text.startswith(prefix) and len(prefix):]

def insert (source_str, insert_str, pos):
    return source_str[:pos]+insert_str+source_str[pos:]

nlp = spacy.load('en_core_web_sm')
doc = nlp(testtext.text1)
ents = []
entsText = []

def suffix(d):
    return "th" if 11 <= d <= 13 else {1: "st", 2: "nd", 3: "rd"}.get(d % 10, "th")

def roam_strftime(fmt, t):
    return t.strftime(fmt).replace("{S}", str(t.day) + suffix(t.day))

def roam_date(dat):
  try:
    parse(dat)
    rmdt = parse(dat)
    if type(rmdt) is datetime.datetime:
      return [roam_strftime("%B {S}, %Y", rmdt)]
    else:
      rmdt = dat
  except:
    rmdt = dat
  return rmdt


for e in doc.ents:

  #ignore numerical labels
  if e.label_ == 'PERCENT' or e.label_ == 'MONEY' or e.label_ == 'TIME' or e.label_ == 'CARDINAL' or e.label_ == 'ORDINAL' or e.label_ == 'QUANTITY':
    continue
  
  #ignore 'PERSON' labels with one word
  elif e.label_ == 'PERSON':
    if contains_multiple_words(e.text) == False:
      continue
    else:
      e.text.capitalize()
      ents.append((e.text, e.start_char, e.end_char, e.label_))
  
  #remove 'the ' prefix from entities
  else:
    if has_prefix(e.text, 'the ') == True:
      e_noprefix = remove_prefix(e.text, 'the ')
      e_startChar = e.start_char + 4
      ents.append((e_noprefix, e_startChar, e.end_char, e.label_))
    else:
      ents.append((e.text, e.start_char, e.end_char, e.label_))

# work backwards through entities, append sq. brackets
for w in sorted(ents, key=lambda x:-x[1]):
    testtext.text1 = testtext.text1[:w[1]] + '[[' + testtext.text1[w[1]:w[2]] + ']]' + testtext.text1[w[2]:]

print(testtext.text1)

mdFile = MdUtils(file_name='mdoutput')
mdFile.write(testtext.text1)
mdFile.create_md_file()