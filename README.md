# RoamNERd
A web tool for Named Entity Recognition in Roam Research  


## What is RoamNERd?

- __RoamNERd__ is a web app which performs Named Entity Recognition on any text - this means that you can paste your text and our algorithm will generate, sort and count relevant backlinks for you. From there, you can copy and paste into Roam with perfect formatting

- __RoamNERd__ is currently in public beta - __and sometimes it shows__. We're working hard to improve the app as fast as we can and are hungry for your feedback. 

- **Have a bug report, suggestion or idea for a killer feature?** Let us know at roamnerd@gmail.com, or use the feedback button on [our site](https://roamnerd.com)


- Don't forget to check out our [public RoamNERd graph](https://roamresearch.com/#/app/roamNERD_test/page/dfr2yR2Zs) to see demos, use-cases and devlogs

### Web Interface [(link)](https://roamnerd.com)
![webDemo](/images/webDemo.png)

## Roam output
![webDemo](/images/outDemo.png)

## Why RoamNERd?
   - __Mission Statement__
        - We believe that tools like Roam Research are only the first step in building a truly semantic, intelligent web. RoamNERd is a first attempt at leveraging these tools to process, catalogue and organise a sea of unorganised text in a practical manner
    - __Use Cases:__
        - **We see RoamNERd as and indispensable tool for processing, sorting and filtering disorganised information, and a natural application of Roam's ethos of __tool-assisted thinking.__**
        - By breaking large bodies of text down into simple, semantically-relevant [[backlinks]], RoamNERd simplifies cross-textual reference and discovery 
        - **We think RoamNERd will be particularly helpful for:**
            - Students and teachers
            - Academic Researchers (Historians, Literary Theorists, Musicologists, Philosophers and Scientists, to name a few )
            - Autodidacts and hackers of all stripes

- **Limitations**
    - __RoamNERd__ uses [spacy](https://spacy.io)'s smallest [pre-trained NLP model](https://spacy.io/models/en#en_core_web_sm) for natural language processing. Unfortunately, it's not perfect (yet!). Occasionaly, it will omit or miscategorise labels. We try to handle this with edge-case detection where we can, and are looking into training our own models
    - Without access to the Roam Research API, we can only tag texts shorter than Roam's paste limit. For now, this means we have a word-count limit on our input - we hope to be able to remove this soon
    - __RoamNERd__ is in public beta, and bugs are to be expected at this early stage. We want the community to do its best to break it so we can build a truly resilient service


### Your brain on RoamNERd
![Test](/images/yourBrain.gif "Your brain on RoamNERd")
