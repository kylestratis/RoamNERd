from main import main
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/tagText", methods=["POST"])
def tag_text():
    if request.method == 'POST':
        posted_text = request.get_json()
        text = posted_text["text"]
        return main(text)

# api index page
@app.route('/')
def index():
    return "<h1>RoamNERd API</h1>"

# Some Flask stuff I don't quite understand
if __name__ == "__main__":
    app.run(debug=True)
