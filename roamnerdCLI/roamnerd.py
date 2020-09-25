import argh
import os.path
import requests

## V0.1 of roamnerd CLI - supports only .txt input.
@argh.arg("files", help="File(s) to load.")
def main(verbose : "Display extra information about [[tags]] (not yet implemented)" =False,
            all : "Concatenate all results into one .md file with shared [[tags]] (not yet implemented)"=False,
            *files):


    for file in files:
        assert file.endswith(".txt"), "One or more of your files is not a .txt file"
        assert os.path.isfile(file), "One or more of your files does not exist or is in a different directory"

    url = "https://roamnerd-be.herokuapp.com/tagText"

    for file in files:
        with open (file, 'r') as input:
            data = { "text" : input.read()}
            x = requests.post(url, json = data)

        with open(file[:-4] + ".md", "w") as out:
            out.write(x.text)
            print("Out: " + file[:-4] + ".md")


argh.dispatch_command(main)
