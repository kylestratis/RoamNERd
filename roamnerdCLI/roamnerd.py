import argh
import pdb
import os
import requests

## V0.1 of roamnerd CLI - supports only .txt input.
def main(verbose=False, all=False, *files):

    url = "https://roamnerd-be.herokuapp.com/tagText"

    for file in files:
        with open (file, 'r') as input:
            data = { "text" : input.read()}
            x = requests.post(url, json = data)

        with open(file[:-4] + ".md", "w") as out:
            out.write(x.text)


argh.dispatch_command(main)
