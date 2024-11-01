from dotenv import load_dotenv
from flask import Flask, make_response, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS
import os
import json

load_dotenv('./.env')
responses = []

def create_app():

    app = Flask(__name__, static_folder='../frontend/dist/frontend/browser')

    @app.route('/api/stress-data', methods=["POST"])
    def post_data():
        # if request.method == "GET":
        #     return make_response("accessed", 200)
        print("called")
        item = request.data.decode().replace("'", '"')
        new_item = json.loads(item)
        responses.append(new_item)
        return make_response({"message":"received"}, 200)

    # @app.route('/get-all-responses')
    # def show_all_responses():
    #     for res in responses:
    #         print (res)
    #     return make_response("success", 200)
    return app


if __name__ == "__main__":
    FLASK_PORT = os.getenv("FLASK_PORT", "3000")
    app = create_app()
    CORS(app)
    app.run(port=FLASK_PORT)