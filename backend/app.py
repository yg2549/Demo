from dotenv import load_dotenv
from flask import Flask, make_response, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import pymongo

load_dotenv('./.env')
responses = []

def create_app():

    app = Flask(__name__, static_folder='../frontend/dist/frontend/browser')
    connection = pymongo.MongoClient(os.getenv("MONGO_URI"))
    db = connection["Tova"]
    @app.route('/')
    def show_home():
        try:
            connection.admin.command("ping")
            print("MongoDB connection successful")
        except Exception as e:
            print("MongoDB connection error:", e)

        return make_response({"page":"active"})

    # @app.route('/create-user')
    # def show_user():
    #     # print("called")
    #     # username = request.data.decode()
    #     # print(username)
    #     print(len(list(db.participants.find())))
    #     return make_response({"message":"received"}, 200)

    @app.route('/api/create-user', methods=["POST"])
    def create_user():
        print("called")
        username = request.data.decode()
        print(username)
        db.participants.insert_one({"user":username})
        print(len(list(db.participants.find())))
        return make_response({"message":username}, 200)

    @app.route('/api/receive-data', methods=["POST"])
    def receive_data():
        # print("called")
        item = request.data.decode().replace("'", '"')
        new_item = json.loads(item)
        # responses.append(new_item)
        # if new_item
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