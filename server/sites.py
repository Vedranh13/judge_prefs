"""This file deals with getting data from tabroom and judgephiliophies"""
import requests
from bs4 import BeautifulSoup
from judge import judge
import _thread
import time
import threading
class site(object):
    def __init__(self, url, proto = 'https://'):
        """This creates a repersentation of a site from a url such as www.tabroom.com. It assumes the site is https"""
        self.url = proto + url
        self.update_html("")
    def update_html(self, new_html):
        self.html = new_html
        self.soup = BeautifulSoup(self.html, 'html.parser')
        self.text = self.soup.get_text()
    def update_judge_phil(self, first_name, last_name, already_have = False):
        jud = judge.init_judge_with_name(first_name, last_name)
        if not already_have:
            self.query_for_judge(first_name, last_name)
        phil = self.get_philiosophy()
        if phil:
            jud.update_field('phil', phil)
        jud.update_field('phil', "No paradigm found")
    def get_philiosophy_base(self, class_string):
        """This function extracts the judge paradigm from the raw html"""
        #TODO abstract later
        for div in self.soup.find_all('div'):
            if div.get('class'):
                if class_string in div.get('class'):
                    return div.get_text()
class tabroom(site):
    def __init__(self):
        super().__init__("www.tabroom.com/index/paradigm.mhtml")
    def query_for_judge(self, first_name = "", last_name = "", jud_id = -1):
        #TODO abstract later
        if jud_id != -1:
            res = requests.get(self.url + "?judge_person_id=" + str(jud_id))
        else:
            res = requests.get(self.url + "?search_first=" + first_name + "&search_last=" + last_name)
        self.update_html(res.text)
    def get_philiosophy(self):
        return self.get_philiosophy_base('paradigm')
    def is_valid_judge_page(self):
        """Checks if this page has a paradigm on it or not"""
        if "Search for a judge at right to read paradigms" in self.text:
            return False
        return True
    def get_judge_name(self):
        """Gets the judge name from the page as a list [first, last]"""
        name = self.soup.h2.get_text().lower().replace("paradigm", "").strip()
        return name.split(" ")
    @staticmethod
    def create_one_judge(jud_id):
        print(jud_id)
        tb = tabroom()
        tb.query_for_judge(jud_id = jud_id)
        if tb.is_valid_judge_page():
            try:
                fn = tb.get_judge_name()[0]
            except Exception as e:
                fn, ls = " ", " "
            try:
                ls = tb.get_judge_name()[1]
            except:
                ls = " "
            judge.create_blank_judge(fn, ls)
            tb.update_judge_phil(fn, ls, already_have = True)
    @staticmethod
    def create_all_judges():
        """This method creates an entry in firebase for every judge in tabroom"""
        #CHANGE TO 283 AGAIN!!!!
        for i in range(283, 57630):
            if _thread._count() > 5:
                 time.sleep(60)
            _thread.start_new_thread(tabroom.create_one_judge, (i,))
class judge_phil(site):
    def __init__(self):
        super().__init__("judgephilosophies.wikispaces.com/")
    def query_for_judge(self, first_name, last_name):
        #TODO abstract later
        res = requests.get(self.url + last_name + "%2C+" + first_name)
        self.update_html(res.text)
    def get_philiosophy(self):
        return self.get_philiosophy_base('commentContainer')
