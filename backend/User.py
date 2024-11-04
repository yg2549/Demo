class User:
    def __init__(self, user, intro, stress, conclusion):
        self.user = user
        self.gender = intro["gender"]
        self.wellbeing = intro["wellbeing"]
        # self.conor = self.sum_score(conor)
        self.stress = self.sum_score(stress)
        self.menstrual = ("n/a", conclusion["changesExplained"]) [conclusion["menstrualChanges"] == "false"]
        self.comments = conclusion["additional comments"]
    
    def sum_score(self, form):
        sum = 0
        for key in form.keys():
            sum += form[key]
        return sum
