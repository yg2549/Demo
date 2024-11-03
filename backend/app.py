from dotenv import load_dotenv
from flask import Flask, make_response, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import pymongo

load_dotenv('./.env')
responses = []

def create_app():
    app = Flask(__name__, static_folder='static/browser')
    connection = pymongo.MongoClient(os.getenv("MONGO_URI"))
    db = connection["Tova"]
    users = db.participants.find()
    for user in users:
        print(user)
    @app.route('/')
    def show_home():
        try:
            connection.admin.command("ping")
            print("MongoDB connection successful")
        except Exception as e:
            print("MongoDB connection error:", e)

        # return make_response({"page":"active"})
        return send_from_directory(app.static_folder, 'index.html')

    
    # Serve static files from the Angular app
    @app.route('/<path:path>')
    def serve_static(path):
        return send_from_directory(app.static_folder, path)

    @app.route('/api/create-user', methods=["POST"])
    def create_user():
        user = request.data.decode()
        # print(user)
        print("here in create api", user)
        db.participants.insert_one({"user":user})
        this_user = db.participants.find_one({"user":user})
        return make_response({"message":user}, 200)

    @app.route('/api/modify-user', methods=["POST"])
    def modify_user():
        # print("called")
        user = request.json[0]
        field = request.json[1]
        data = request.json[2]
        # print(item1)
        # print(item2)
        db.participants.update_one({"user":user}, { '$set': { field:data} })
        return make_response({"message":"api was called"}, 200)
    
    @app.route('/api/export-results', methods=["POST"])
    def export_results():
        user = request.json[0]
        # user = db.participants.find_one({"user":request_user})
        results = aggregate_results(user)
        for item in results:
            print(item)
        return make_response({"message":"api was called"}, 200)

    def aggregate_results(user):
        user = db.participants.find_one({"user":user})
        print(user)
        intro_results = user['intro_results']
        conor_results = user['conor_results']
        stress_results = user['stress_results']

        conor_sum = 0
        stress_sum = 0
        for question in conor_results:
            conor_sum += conor_results[question]
        for question in stress_results:
            stress_sum += stress_results[question]
        
        gender = intro_results["gender"]
        written_answers = []
        if intro_results["wellbeing"] == "":
            written_answers.append("user did not report current mood")
        else:
            written_answers.append(intro_results["wellbeing"])
        
        return [gender, conor_sum, stress_sum, written_answers]

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
    # app.run(port=FLASK_PORT)
    app.run(host="0.0.0.0", port=5000)