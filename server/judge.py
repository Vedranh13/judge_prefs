"""Class repersenting a debate judge"""
# TODO intelligent error checking
from global_vars import db
class judge(object):
    def __init__(self, judge_id):
        """Constructor for judges"""
        # judge_id is a GUID for each judge
        self.judge_id = judge_id
        # query database at this point
        self.data = db.child("judges").child(judge_id).get().val()
        self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']
        self.spreading = float(self.data['spreading'])
        # TODO more metrics
    @classmethod
    def create_new_judge(cls, data):
        """Create a new judge in firebase from DATA dictionary, returns a new judge object"""
        return cls(db.child("judges").push(data)['name'])
    @classmethod
    def init_judge_with_name(cls, first, last):
        # TODO Handel reps
        """This method returns a new judge object given a FIRST and LAST name. If no judge is found, return None"""
        for judge_id, judge in db.child("judges").order_by_child('first_name').equal_to(first).get().val().items():
            if judge['last_name'] == last:
                return cls(judge_id)
        return None
