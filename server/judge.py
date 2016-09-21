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
        self.T = float(self.data['T'])
        # TODO more metrics
    @classmethod
    def create_new_judge(cls, data):
        """Create a new judge in firebase from DATA dictionary, returns a new judge object"""
        if cls.is_data_valid(data):
            return cls(db.child("judges").push(data)['name'])
        return None # TODO something intelligent here. Raise Exception maybe?
    @classmethod
    def init_judge_with_name(cls, first, last):
        # TODO Handel reps
        """This method returns a new judge object given a FIRST and LAST name. If no judge is found, return None"""
        for judge_id, judge in db.child("judges").order_by_child('first_name').equal_to(first).get().val().items():
            if judge['last_name'] == last:
                return cls(judge_id)
        return None
    @staticmethod
    def is_data_valid(data_dictionary):
        """A function which checks that DATA_DICTIONARY has all the keys a judge object should have

        >>> first = "john"
        >>> last = "denero"
        >>> data = { 'first' : first, 'last' : last }
        >>> judge.is_data_valid(data)
        False
        >>> spread = 1.0
        >>> T = 5.6
        >>> data = { 'first' : first, 'last' : last, 'spreading' : spread, 'T' : 5.6 }
        >>> judge.is_data_valid(data)
        False
        >>> data = { 'first_name' : first, 'last_name' : last, 'spreading' : spread, 'T' : 5.6 }
        >>> judge.is_data_valid(data)
        True
        >>> data = { 'first_name' : "first", 'last_name' : "last", 'spreading' : 5.0, 'T' : 2}
        >>> judge.is_data_valid(data)
        False
        >>> data = { 'first_name' : "first", 'last_name' : "last", 'spreading' : 5.0, 'T' : 2.0}
        >>> judge.is_data_valid(data)
        True
        """
        def helper(key, variable_type):
            """A function which given a KEY and a VARIBALE_TYPE checks if there is a key with a value of that type
            in DATA_DICTIONARY"""
            if key not in data_dictionary or type(data_dictionary[key]) != variable_type:
                return False
            return True
        fields = [ ['first_name' , str], ['last_name', str], ['spreading', float], ['T', float] ]
        is_valid = True
        for key, variable_type in fields:
            is_valid = is_valid and helper(key, variable_type)
        return is_valid
