from logging import _STYLES
import os
from dotenv import load_dotenv
import openpyxl
import pymongo
import reportlab
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from bidi.algorithm import get_display

# load_dotenv('./.env')
load_dotenv()
connection = pymongo.MongoClient(os.getenv("MONGO_URI"))
# print(os.getenv("MONGO_URI"))
db = connection[os.getenv("MONGO_DBNAME")].tova_participants

intro_questions = {
    "gender": "מגדר",
    "wellbeing": "תרצ.י לשתף איך את מרגישה היום"
}   
intro_options = {
    "man":"זכר",
    "woman":"נקבה",
    "other":"אחר"
}
conor_questions ={
     
    "q1":"חשב.י על החודש האחרון, עד כמה נכון לגביך ההיגד: אני מצליח.ה להסתגל לשינויים",
    "q2":"חשב.י על החודש האחרון, עד כמה נכון לגביך ההיגד: אני יכול.ה להתמודד עם כל דבר",
    "q3":"חשב.י על החודש האחרון, עד כמה נכון לגביך ההיגד: אני רואה את הצד המשעשע בדברים",
    "q4":"חשב.י על החודש האחרון, עד כמה נכון לגביך ההיגד: התמודדות עם לחץ מחזקת אותי",
    "q5":"חשב.י על החודש האחרון, עד כמה נכון לגביך  ההיגד: אני נוטה להתאושש בקלות ממחלה \n או קושי",
    "q6":"חשב.י על החודש האחרון, עד כמה נכון לגביך ההיגד: תחת לחץ, אני מתמקד.ת וחושב בבהירות",
    "q7":" חשב.י על החודש האחרון, עד כמה נכון לגביך ההיגד: אני יכול.ה להשיג את המטרות שלי \n למרות הקשיים",
    "q8":"חשב.י על החודש האחרון, עד כמה נכון לגביך ההיגד: אני לא מתייאש.ת בקלות מכישלונות",
    "q9":"חשב.י על החודש האחרון, עד כמה נכון לגביך ההיגד: אני חושב.ת על עצמי כעל אדם חזק",
    "q10":"חשב.י על החודש האחרון, עד כמה נכון לגביך ההיגד אני: יכול.ה להתמודד עם רגשות לא נעימים"

}
conor_options = [
    "לא נכון בכלל",
    "נכון לעיתים רחוקות",
    "לפעמים נכון",
    "נכון לעיתים קרובות",
    "נכון כמעט כל הזמן"
]
stress_questions = {
    "q1": "בחודש האחרון, באיזו מידה היית 'מעוצבנ.ת' בגלל משהו שקרה באופן בלתי צפוי",
    "q2": "בחודש האחרון, באיזו מידה הרגשת חוסר שליטה בדברים החשובים בחייך",
    "q3": "בחודש האחרון, באיזו מידה הרגשת עצבני.ת 'לחוצ.ה",
    "q4": "בחודש האחרון, באיזו מידה טיפלת בהצלחה במטרדים מרגיזים",
    "q5": "בחודש האחרון, באיזו מידה הרגשת שאת.ה מתמודד.ת ביעילות עם שינויים חשובים בחייך",
    "q6": "בחודש האחרון, באיזו מידה הרגשת בטחון ביכולתך לטפל בבעיותיך האישיות",
    "q7": "בחודש האחרון, באיזו מידה הרגשת שהדברים מתפתחים בהתאם לרצונך",
    "q8": "בחודש האחרון, באיזו מידה יכולת להתמודד עם כל הדברים שהיה עליך לעשות",
    "q9": "בחודש האחרון, באיזו מידה יכולת לשלוט בדברים המרגיזים אותך",
    "q10": "בחודש האחרון, באיזו מידה הרגשת שאת.ה שולט.ת במצב",
    "q11": "בחודש האחרון, באיזו מידה התרגזת בגלל אירועים שהיו מחוץ לשליטתך",
    "q12": "בחודש האחרון, באיזו מידה הטרידו אותך מחשבות על דברים שהיה עליך להשלים",
    "q13": "בחודש האחרון, באיזו מידה יכולת לשלוט בדרך שבה את/ה מנצל.ת את זמנך",
    "q14": "בחודש האחרון, באיזו מידה הרגשת שהקשיים מצטברים עד כדי כך שלא יכולת להתגבר עליהם"
}
stress_options = {
    "regular": [
        "כמעט אף פעם",
        "לעיתים רחוקות",
        "לפעמים",
        "לעיתים קרובות",
        "לעיתים קרובות מאד",
    ],
    "flipped": [
        "לעיתים קרובות מאד",
        "לעיתים קרובות",
        "לפעמים",
        "לעיתים רחוקות",
        "כמעט אף פעם",
    ]
}
conclusion_questions = {
    "menstrualChanges": "האם שמת לב לשינויים במחזור החודשי שלך בחודשים האחרונים",
    "changesExplained": "תרצי לספר מה השינויים אליהם שמת לב",
    "additional comments":"יש עוד משהו שתרצ.י לשתף"
}
conclusion_options = {
    "true": "כן",
    "false": "לא",
    "": "–"
}

def get_intro(participant):
    intro = {}
    for question in participant["intro_results"]:
        qname = intro_questions[question]
        answer = participant["intro_results"][question]
        if answer in intro_options.keys():
            answer = intro_options[answer]
        intro[qname] = answer
    return intro
def get_conor(participant):
    conor = {}
    for question in participant["conor_results"]:
        qname = conor_questions[question]
        answer = conor_options[participant["conor_results"][question]]
        conor[qname] = answer
    return conor
def get_stress(participant):
    stress = {}
    for question in participant["stress_results"]:
        qname = stress_questions[question]
        if question in ["q4", "q5", "q6", "q7", "q9", "q10", "q13"]:
            answer = stress_options["flipped"][participant["stress_results"][question]]
        else:
            answer = stress_options["regular"][participant["stress_results"][question]]
        stress[qname] = answer
    return stress
def get_conclusion(participant):
    conclusion = {}
    for question in participant["conclusion_results"]:
        qname = conclusion_questions[question]
        answer = participant["conclusion_results"][question]
        if answer in conclusion_options.keys():
            answer = conclusion_options[answer]
        conclusion[qname] = answer
    return conclusion
def sum_score(form):
    sum = 0
    for key in form.keys():
        sum += form[key]
    return sum

participants = db.find()
users = []
for participant in participants:
    participant_data = {}
    participant_data['user'] = participant['user']
    if "intro_results" in participant.keys():
        intro = get_intro(participant)
        participant_data["intro"] = intro

    if "conor_results" in participant.keys():
        conor = get_conor(participant)
        participant_data["conor"] = conor        
    
    if "stress_results" in participant.keys():
        stress = get_stress(participant)
        participant_data["stress"] = stress
    
    if "conclusion_results" in participant.keys():
        conclusion = get_conclusion(participant)
        participant_data["conclusion"] = conclusion

    users.append(participant_data)
    # print(participant_data)

# Create document
pdf = SimpleDocTemplate("tova-output.pdf", pagesize=letter)
pdfmetrics.registerFont(TTFont('Arial', 'Arial.ttf'))

elements = []
styles = getSampleStyleSheet()
hebrew_style = styles['Normal']
hebrew_style.fontName = 'Arial'
hebrew_style.fontSize = 10
hebrew_style.leading = 12
headers = [[get_display("תשובה"), get_display("תוכן שאלה"), get_display("סט שאלות")]]
for user in users:
    styles = getSampleStyleSheet()
    header_style = styles['Normal']
    header_style.fontName = 'Arial'
    header_style.fontSize = 16
    header_style.alignment = 2  # Center alignment
    header_text = f"{user['user']}\n\n"
    header_paragraph = Paragraph(header_text, header_style)
    elements.append(header_paragraph)
    elements.append(Spacer(1, 12))


    data = [[get_display("תשובה"), get_display("תוכן שאלה"), get_display("סט שאלות")]]
    for section in user.keys():
        for question in user[section]:
            # row = [section, question, user[section][question]]
            row = []
            if section == 'user': continue
            if type(user[section][question]) == bool:
                row.append(user[section][question])
            else:
                row.append(Paragraph(get_display(user[section][question]), hebrew_style))
            # print(row)
            row.append(get_display(question))
            row.append(get_display(section))
            data.append(row)

    table = Table(data, colWidths=[100, 400, 60])
    table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ('ALIGN', (0, 0), (-1, -1), 'RIGHT'),  # Align text to the right for RTL support
    ('FONT', (0, 0), (-1, -1), 'Arial'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
    ('VALIGN', (0, 0), (-1, -1), 'TOP')  # Vertically align text to the top for better readability
]))

    elements.extend([table])
    elements.append(Spacer(1, 12))


styles = getSampleStyleSheet()
header_style = styles['Normal']
header_style.fontName = 'Arial'
header_style.fontSize = 16
header_style.alignment = 2  # Center alignment
header_text = "Summary"
header_paragraph = Paragraph(header_text, header_style)
elements.append(header_paragraph)
elements.append(Spacer(1, 12))

data = [[get_display('נורת אזהרה\n (אם הציונים גבוהים \nמאד)'), get_display('ציון שאלון PSS'), get_display('ציון שאלון קונור'), get_display('תאריך מילוי השאלון'), get_display('מספר משתתף')]]

participants = db.find()
# print(participants)
for participant in participants:
    info = []
    stress = -1
    conor = -1
    if 'stress_results' in participant.keys():
        stress = sum_score(participant['stress_results'])
    else:
        continue
    if 'conor_results' in participant.keys():
        conor = sum_score(participant['conor_results'])
    else:
        info.append('-')

    if stress > 45 or conor > 30:
        info.append("yes")
    else:
        info.append("no")
    info.append(stress)
    info.append(conor)
    info.append('10-11-2024')
    info.append(participant['user'])
    data.append(info)

table = Table(data, colWidths=[100, 100, 100, 100, 100])
table.setStyle(TableStyle([
('BACKGROUND', (0, 0), (-1, 0), colors.grey),
('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
('ALIGN', (0, 0), (-1, -1), 'RIGHT'),  # Align text to the right for RTL support
('FONT', (0, 0), (-1, -1), 'Arial'),
('FONTSIZE', (0, 0), (-1, -1), 10),
('GRID', (0, 0), (-1, -1), 0.5, colors.black),
('VALIGN', (0, 0), (-1, -1), 'TOP')  # Vertically align text to the top for better readability
]))

elements.extend([table])
pdf.build(elements)
