import argh
import os
import requests

@argh.arg("files", help="File(s) to load.")
def main(verbose : "Display extra information about [[tags]] (not yet implemented)" =False,
            all : "Concatenate all results into one .md file with shared [[tags]] (not yet implemented)"=False,
            *files):

    if len(files) == 0:
        return

    for file in files:
        assert file.endswith(".txt"), "One or more of your files is not a .txt file"
        assert os.path.isfile(file), "One or more of your files does not exist or is in a different directory"

    url = "https://roamnerd-be.herokuapp.com/tagText"

    totalEntityCount = 0
    writtenFiles = 0
    numFiles = len(files)

    if all:
        with open("merge.txt", "w") as outfile:
            for file in files:
                with open(file, "r") as infile:
                    contents = infile.read()
                    outfile.write(contents)
            files = ["merge.txt"]


    for file in files:
        with open (file, 'r') as input:
            data = { "text" : input.read()}
            x = requests.post(url, json = data)
            x = x.json()

        localEntityCount= sum(len(v) for v in x["backLinks"].values())
        totalEntityCount += localEntityCount

        with open(file[:-4] + ".md", "w") as out:
            out.write(x["text"])
            writtenFiles += 1

            if verbose:
                allEnts = []
                for v in x["backLinks"].values():
                    allEnts = allEnts + v

                if len(allEnts) > 2:
                    if all:
                        print("\nFile 1 of 1: {0} files -> {1}.md".format(str(numFiles), file[:-4]))
                        os.remove("merge.txt")

                    else:
                        print("\nFile {0} of {1}: {2} -> {3}.md".format(str(writtenFiles), str(numFiles), file, file[:-4]))

                    print("Found entities: {0}, {1}, {2} and {3} more ".format(allEnts[0], allEnts[1], allEnts[2], str(localEntityCount - 3)))



    print("\nAnalyzed {0} files, found {1} named entities, wrote {2} file(s)\n".format(str(numFiles), str(totalEntityCount), str(writtenFiles)))
argh.dispatch_command(main)
