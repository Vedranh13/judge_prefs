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
"""Explanation of debate terms / jduge variables:
T : Short for topicality win rate ie what is the win rate when running a topicallity type argument with this judge
K_af : Same as T but afirmative kritique argument"""
