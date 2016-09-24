"""This file deals with getting data from tabroom and judgephiliophies"""
import requests
from bs4 import BeautifulSoup
from judge import judge
class site(object):
    def __init__(self, url, proto = 'https://'):
        """This creates a repersentation of a site from a url such as www.tabroom.com. It assumes the site is https"""
        self.url = proto + url
        self.update_html("")
    def update_html(self, new_html):
        self.html = new_html
        self.soup = BeautifulSoup(self.html, 'html.parser')
    def update_judge_phil(self, first_name, last_name):
        jud = judge.init_judge_with_name(first_name, last_name)
        self.query_for_judge(first_name, last_name)
        jud.update_field('phil', self.get_philiosophy())
    def get_philiosophy_base(self, class_string):
        """This function extracts the judge paradigm from the raw html"""
        #TODO abstract later
        for div in self.soup.find_all('div'):
            if div.get('class'):
                if class_string in div.get('class'):
                    print(div.get_text())
                    return div.get_text()
class tabroom(site):
    def __init__(self):
        super().__init__("www.tabroom.com/index/paradigm.mhtml")
    def query_for_judge(self, first_name, last_name):
        #TODO abstract later
        res = requests.get(self.url + "?search_first=" + first_name + "&search_last=" + last_name)
        self.update_html(res.text)
    def get_philiosophy(self):
        return self.get_philiosophy_base('paradigm')
class judge_phil(site):
    def __init__(self):
        super().__init__("judgephilosophies.wikispaces.com/")
    def query_for_judge(self, first_name, last_name):
        #TODO abstract later
        res = requests.get(self.url + last_name + "%2C+" + first_name)
        self.update_html(res.text)
    def get_philiosophy(self):
        return self.get_philiosophy_base('commentContainer')
