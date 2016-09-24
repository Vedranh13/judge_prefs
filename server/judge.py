"""File for repersenting firebase data"""
# TODO intelligent error checking
from global_vars import db
from global_vars import last_upload
class fb_object(object):
    """Abstract class for anything repersented in the database such as an upload or a judge"""
    def __init__(self, guid, type):
        """Takes in a str GUID and a string TYPE and fetches all the data from fb"""
        self.guid = guid
        self.data = db.child(type).child(self.guid).get().val()
        self.does_exist = True
        if not self.exists():
            self.does_exist = False
            return None
    def exists(self):
        """Checks if the object exists in the database"""
        if self.data:
            return True
        return False
class judge(fb_object):
    def __init__(self, judge_id):
        """Constructor for judges"""
        # judge_id is a GUID for each judge
        super().__init__(judge_id, 'judges')
        if not self.does_exist:
            return None
        self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']
        self.spreading = float(self.data['spreading'])
        self.phil = self.data['phil']
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
        # TODO update doctests
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
        fields = [ ['first_name' , str], ['last_name', str], ['spreading', float], ['phil', str ] ]
        is_valid = True
        for key, variable_type in fields:
            is_valid = is_valid and helper(key, variable_type)
        return is_valid
class upload(fb_object):
    def __init__(self, upload_id):
        """This takes in an UPLOAD_ID and fetches all data for that upload from fb"""
        super().__init__(upload_id, 'user_uploads')
        if not self.does_exist:
            print(upload_id)
            return None
        self.user = self.data['user']
        # Have indiviudal fields for all judge info or one dict?
    def upload_exists(self):
        if self.data:
            return True
        return False
    @classmethod
    def get_upload(cls):
        #TODO DRY
        #TODO make this not cancer
        global last_upload
        last_upload += 1
        return cls(list(dict(db.child('user_uploads').order_by_child('upload_number').equal_to(last_upload).get().val().items()).keys())[0])
