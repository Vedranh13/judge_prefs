"""Class repersenting a debate judge"""
from global_vars import db
class judge(object):
    def __init__(self, judge_id):
        """Constructor for judges"""
        # judge_id is a GUID for each judge
        self.judge_id = judge_id
        # query database at this point
        self.data = db.child("judges").child(str(judge_id)).get().val()
        self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']
        self.spreading = float(self.data['spreading'])
        # TODO more metrics
    @classmethod
    def create_new_judge(cls, data):
        """Create a new judge in firebase from DATA dictionary, returns a new judge object"""
        return cls(db.child("judges").push(data)['name'])
    @classmethod
    def get_judge_id_name(cls, first, last):
        """This method returns a new judge object given a FIRST and LAST name"""
        pass
