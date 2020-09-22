import spacy
from flask import Flask, request

app = Flask(__name__)

if __name__ == "__main__":
    app.run(debug=True)


@app.route("/tagText", methods=["POST"])
def tag_text():
    if request.method == 'POST':
        posted_text = request.get_json()
        text = posted_text['text']
        return main(text)


def contains_multiple_words(s):
    return len(s.split()) > 1


def has_prefix(text, prefix):
    return text.startswith(prefix)


def remove_prefix(text, prefix):
    return text[text.startswith(prefix) and len(prefix):]


def main(textInput):
    textOutput = {}
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(textInput)
    entities = []
    for e in doc.ents:

        # ignore numerical labels
        if e.label_ == 'PERCENT' or e.label_ == 'MONEY' or e.label_ == 'TIME' or e.label_ == 'CARDINAL' or e.label_ == 'ORDINAL' or e.label_ == 'QUANTITY':
            continue

        # ignore 'PERSON' labels with one word
        elif e.label_ == 'PERSON':
            if not contains_multiple_words(e.text):
                continue
            else:
                e.text.capitalize()
                entities.append((e.text, e.start_char, e.end_char, e.label_))

        # remove 'the ' prefix from entities
        else:
            if has_prefix(e.text, 'the '):
                e_no_prefix = remove_prefix(e.text, 'the ')
                e_startChar = e.start_char + 4
                entities.append((e_no_prefix, e_startChar, e.end_char, e.label_))
            else:
                entities.append((e.text, e.start_char, e.end_char, e.label_))

    # work backwards through entities, append sq. brackets
    for w in sorted(entities, key=lambda x: -x[1]):
        textOutputString = textInput[:w[1]] + '[[' + textInput[w[1]:w[2]] + ']]' + textInput[w[2]:]
        textOutput.update(text=textOutputString)

    return textOutput
