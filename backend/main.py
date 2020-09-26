## Imports
import spacy
from dateutil.parser import parse

## Our main function, and how you access our backend. For now, we only
## pass it text but eventually it will also parse a bunch of optional args
def main(rawInput):

    # Load our model and run it against our input string
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(rawInput)

    ## Let's make a list of spacy categories we want to grab
    spacyCategories = ["PERSON", "DATE", "LOC", "EVENT", "ORG","GPE"]
    readableCategories = ["People", "Dates", "Locations", "Organisations", "Geopolitical Entities"]

    # We should also generate a dictionary of roam backLinks by category where we can store our tags in plaintext
    # This will make it easier to count our tags later on.
    backLinks = {
            "People" : [],
             "Dates" : [],
             "Locations" : [],
             "Organisations" : [],
             "Geopolitical Entities" : []
             }


    # Finally, we're also going to make a list of removed backLinks - this is so we
    # have to cross reference our whole doc if we remove tag but it keeps popping up.
    # We don't have to worry about sorting this one by category.
    removedBackLinks = []
    ## Loop through our identified words
    for word in doc.ents:

        ## First, let's only grab words that have the labels we want
        if (word.label_ not in spacyCategories):
            continue

        # I though about implementing a switch statement in python, but they're not
        # terribly readable in Python. We'll go with elifs
        if (word.label_ == "PERSON"):
            processPerson(word, doc, backLinks["People"], removedBackLinks)
        elif (word.label_ == "DATE"):
            processDate(word, doc, backLinks["Dates"], removedBackLinks)
        elif (word.label_ == "LOC"):
            processDefault(word, doc, backLinks["Locations"], backLinks, readableCategories, removedBackLinks)
        elif (word.label_ == "ORG"):
            processDefault(word, doc, backLinks["Organisations"], backLinks, readableCategories, removedBackLinks, )
        elif (word.label_ == "GPE"):
            processDefault(word, doc, backLinks["Geopolitical Entities"], backLinks, readableCategories, removedBackLinks)

    annotatedText = docToRoam(doc, backLinks)
    annotatedText = generateMarkdown(annotatedText, backLinks)
    return({"text" : annotatedText, "backLinks" : backLinks})

## A function for processing people identified by our model. Handles repeats, mononyms, honorifics
## and misattribution
def processPerson(person, doc, backLinks, removedBackLinks):

    # A generic list of common english-language honorifics
    honorifics = ["Mr", "Mr.", "Ms", "Ms.", "Mrs", "Mrs."]

    # First, lets check for repeats:
    if person.text in backLinks:
        return

    ## Handle punctuation first - this is a bit lazy and deserves revisiting but:
    ## if the final character is punctuation, we'll just throw it out. I guess we can call
    ## it a misattribution.
    if (person[-1].pos_ == "PUNCT"):
        removedBackLinks.append(person.text)
        return

    # Handling mononyms - if a more specific version of the same name exists in doc, return.
    if len(person) == 1 and person.text not in removedBackLinks:

       # Let's grab a list of all people in the doc, and we can cross-reference names.
       people = [ent for ent in doc.ents if ent.label_ == "PERSON"]
       for entry in people:
           # Let's look at every name in our list, and see if they share a last name with our mononym. If so,
           # we'll remove the mononym and add it do the removedBackLinks list, Else, we add it
           if entry[-1].text == person.text:
               removedBackLinks.append(person.text)
               return

           if entry[0].text == person.text:
               removedBackLinks.append(person.text)
               return



    # Now, let's deal with honorifics:
    if(person[0].text in honorifics):
       # A short list of common honorifics - these will do for now but could do with expanding.
       people = [ent for ent in doc.ents if ent.label_ == "PERSON"]
       for entry in people:
           if(entry[-1].text == person[-1].text):
               removedBackLinks.append(person.text)
               return

    # Checking that our names aren't all caps or all lower-case:
    for word in person:
        if (word.text == word.text.upper() or word.text == word.text.lower()):
            removedBackLinks.append(person.text)
            return

    ## And finally, if we haven't filtered the tag out, we can add it as a page
    backLinks.append(person.text)
    return

## A function for processing dates identified by our model. Filters out dates that can't be parsed sensibly
## by dateutil
def processDate(date, doc, backLinks, removedBackLinks):
    # Add more edge case handling in future!
    if(date.text in removedBackLinks or date.text in backLinks):
        return
    if(len(date.text) < 4):
        return
    try:
        parse(date.text)
        backLinks.append(date.text)
        print(dateObject)

    except:
        removedBackLinks.append(date.text)
        return

## A default processing function for categories we haven't mapped edge
## cases for yet. Does basic grammatic / logical filtering, and makes sure it's
## results don't show up in other lists.
def processDefault(word, doc, backLinks, pageDictionary, categories, removedBackLinks):

    if word.text in removedBackLinks or word.text in backLinks:
        return

    # Check capitalisation
    for token in word:
        if (word.text == word.text.upper() or word.text == word.text.lower()):
            removedBackLinks.append(word.text)
            return

    # Check page doesn't already exist in wider dictionary
    for category in categories:
        for page in pageDictionary[category]:
            for token in page.split(" "):
                if word[-1].text == token:
                    removedBackLinks.append(word.text)
                    return

    backLinks.append(word.text)
    return

## Takes a given string and converts it into a Roam page: "Roam" -> "[[Roam]]"
def roamPagify(string):
    return "[["+string+"]]"

## Writes from doc to roam output. Returns a string
def docToRoam(doc, backLinks):

    roamOut = []
    sentences = doc.sents

    allPages = []
    for page in backLinks.values():
        allPages += page

    for sentence in sentences:
        replaceBuffer = []
        roamBlock = sentence.text

        # Let's grab all of the ents, and if they're in the doc
        # we can add them to a buffer
        for ent in sentence.ents:
            if ent.text in allPages:
                replaceBuffer.append(ent.text)

        for page in replaceBuffer:
            roamBlock = roamBlock.replace(page, roamPagify(page))


        roamOut.append(roamBlock)

    return("\n   - ".join(roamOut))

## Generates a .md string with header
def generateMarkdown(text, backLinks):

    # Building the header
    markdownRaw = "***Tags:**\n"
    for category in backLinks.items():
        if(len(category[1]) == 0):
            continue
        ## First, lets make the category label and the count
        markdownRaw += "    - " + "__"+category[0]+"__" + ": " + str(len(category[1])) + "  \n"

        ## Now, we can add our list of backLinks, formatted as a string
        pageString = []
        for page in category[1]:
            pageString.append(roamPagify(page))
        pageString = ", ".join(pageString)

        markdownRaw += "        - "+pageString + "  \n"

    ## Now, lets add our raw roam blocks + backLinks
    markdownRaw += "***Raw Text:** " + "  \n" + "    - " + text
    return markdownRaw
