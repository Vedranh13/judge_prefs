"""Variables to be used throughout the project"""
firebase_url = "https://judge-prefs.firebaseio.com/"

import pyrebase
config = {
  "apiKey": "apiKey",
  "authDomain": "judge-prefs.firebaseapp.com",
  "databaseURL": firebase_url,
  "storageBucket": "judge-prefs.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
global last_upload
#TODO persistance is good
last_upload = 4
"""Explanation of debate terms / jduge variables:
spreading : judge preference for fasting talking out of ten
trad_aff : the percent of times the judge will vote affirmative on a traditional case
k_aff : the percent of times the judge will vote affirmative on a kritikal case
"""
def calc_p(wr, num, won = False):
    if won:
        return ((num - 1) * wr + 1) / num
    return ((num - 1) * wr) / num
