from dotenv import load_dotenv
from flask import Flask, make_response, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
import os
import json
import pymongo
import pandas
import openpyxl
from werkzeug.security import check_password_hash, generate_password_hash

load_dotenv()
responses = []
app = Flask(__name__, static_folder='static/browser')
connection = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = connection[os.getenv("MONGO_DBNAME")].tova_participants
db2 = connection[os.getenv("MONGO_DBNAME")].admins

# hello world
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

@app.route('/api/admin-login', methods=["POST"])
def admin_login():
    data = request.get_json()
    # Retrieve username and password from request
    username = data.get('username')
    password = data.get('password')

    # real way to validate but comment for now because no hashed passwords yet
    user = db2.find_one({"username": username})
    if user and check_password_hash(user['password'], password):
        return jsonify({"success": True, "message": "Login successful", "site":user['site']})
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

# make admin sign up route/process

@app.route('/api/get-site-data')
def get_site_data():
    site = request.args.get("site")
    participants = list(db.find({"site":int(site)}))
    data = list(participants)
    for participant in data:
        participant['_id'] = str(participant['_id'])  # Convert ObjectId to string
    return jsonify(data)

@app.route('/api/get-participant-data')
def get_participant_data():
    participant = request.args.get("participant")
    data = db.find_one({"user":participant})
    data['_id'] = str(data['_id'])
    return jsonify(data)

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/create-user', methods=["POST"])
def create_user():
    user = request.data.decode()
    db.insert_one({"user":user, "date":datetime.today()})
    return make_response({"message":"success"}, 200)

@app.route('/api/modify-user', methods=["POST"])
def modify_user():
    user = request.json[0]
    field = request.json[1]
    data = request.json[2]
    db.update_one({"user":user}, { '$set': { field:data} })
    return make_response({"message":"api was called"}, 200)

@app.route('/api/export-results', methods=["POST"])
def export_results():
    user = request.json[0]
    # user = db.participants.find_one({"user":request_user})
    results = aggregate_results(user)
    for item in results:
        print(item)
    return make_response({"message":"api was called"}, 200)

# @app.route('/api/get-results')
def get_results():
    # db.tova_participants.insert_one({
    #     "user":"chappel_roan",
    #     "intro_results":{
    #         "gender":"woman",
    #         "wellbeing":"stressed"
    #     },
    #     "conor_results":{
    #         "q1":0,
    #         "q2":0,
    #         "q3":0,
    #         "q4":0,
    #         "q5":0,
    #         "q6":0,
    #         "q7":4,
    #         "q8":4,
    #         "q9":4,
    #         "q10":4,
    #     },
    #     "stress_results":{
    #         "q1":1,
    #         "q2":1,
    #         "q3":1,
    #         "q4":1,
    #     },
    #     "conclusion_results":{
    #         "menstrualChanges":"false",
    #         "changesExplained":"",
    #         "additional comments": "i have none"
    #     }
    # })
    users = db.tova_participants.find()
    participants = []
    for user in users:
        participant = {
            "user": user['user'],
            "gender": user['intro_results']["gender"],
            "wellbeing": user['intro_results']['wellbeing'],
            "stress": user['stress_results']["q1"],
            "menstrual": ("n/a", user['conclusion_results']["changesExplained"]) [user["intro_results"]["gender"] != "woman" or user["conclusion_results"]["menstrualChanges"] == "false"],
            "comments": user['conclusion_results']["additional comments"]
        }
        participants.append(participant)
    
    for participant in participants:
        print(str(participant))
    export()
    return make_response({},200)
def export():
    # Create a new Excel workbook
    print("called")
    workbook = openpyxl.Workbook()
# Select the default sheet (usually named 'Sheet')
    sheet = workbook.active
# Add data to the Excel sheet
    users = db.tova_participants.find()
    data = [
        ["User", "Gender", "Wellbeing", "Conor", "Stress", "Menstrual", "comments"]
    ]
    for user in users:
        participant = [
            user['user'],
            user['intro_results']["gender"],
            user['intro_results']['wellbeing'],
            sum_score(user['conor_results']),
            sum_score(user['stress_results']),
            assign_menstrual(user['conclusion_results']),
            user['conclusion_results']["additional comments"]
        ]
        data.append(participant)
    for row in data:
        sheet.append(row)
# Save the workbook to a file
    workbook.save("tova_results.xlsx")
# Print a success message
    print("Excel file created successfully!")
def sum_score(form):
    sum = 0
    for key in form.keys():
        sum += form[key]
    return sum
def assign_menstrual(form):
    if form['menstrualChanges'] == "false":
        return "n/a"
    return form["changesExplained"]
def aggregate_results(user):
    user = db.tova_participants.find_one({"user":user})
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

CORS(app)
app.run(host='0.0.0.0', port=5001)