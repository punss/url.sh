from flask import Flask, request, redirect
from pymongo import MongoClient
from flask_cors import CORS
from markupsafe import escape
import random
import string

app = Flask(__name__, template_folder='templates')
CORS(app)
client = MongoClient()
db = client.url_sh
url_db = db.urls


@app.route('/', methods=['POST'])
def new_path():
    print("That was a {} request".format(request.method))
    json_data = request.get_json()
    if url_db.find_one({"customurl": json_data['customurl']}):
        return {"message": "that url is already taken"}
    elif json_data["customurl"] == "":
        customurl = "".join(random.choices(string.ascii_lowercase, k=5))
        print(customurl)
        url_db.insert({
            "url": json_data["url"],
            "customurl": customurl,
        })
        return {
            "message": "http://localhost:3000/{}".format(customurl)
            }
    else:
        customurl = json_data["customurl"]
        url_db.insert({
            "url": json_data["url"],
            "customurl": customurl,
        })
        return {
            "message": "http://localhost:3000/{}".format(
                customurl
                )
        }


@app.route("/<shorturl>", methods=["POST"])
def redirect(shorturl):
    redirect_url = url_db.find_one({"customurl": escape(shorturl)})
    print(escape(shorturl))
    if redirect_url:
        return {"redirect": "true", "url": redirect_url["url"]}
    else:
        return {"redirect": "false"}


# def create_new_short():
#     pass

# def get_url():
#     pass

if __name__ == "__main__":
    app.run()
