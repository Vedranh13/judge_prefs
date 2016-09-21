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
