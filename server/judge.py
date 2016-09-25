"""File for repersenting firebase data"""
# TODO intelligent error checking
from global_vars import db
from global_vars import last_upload
from global_vars import calc_p
import time
class fb_object(object):
    """Abstract class for anything repersented in the database such as an upload or a judge"""
    def __init__(self, guid, type):
        """Takes in a str GUID and a string TYPE and fetches all the data from fb"""
        self.guid = guid
        self.data = db.child(type).child(self.guid).get().val()
        self.orig_data = self.data.copy()
        self.does_exist = True
        if not self.exists():
            self.does_exist = False
            return None
    def exists(self):
        """Checks if the object exists in the database"""
        if self.data:
            return True
        return False
    def get_value(self, field):
        return self.data[field]
class judge(fb_object):
    def __init__(self, judge_id):
        """Constructor for judges"""
        # judge_id is a GUID for each judge
        super().__init__(judge_id, 'judges')
        if not self.does_exist:
            return None
        #TODO potentonally just use self.data
        """self.first_name = self.data['first_name']
        self.last_name = self.data['last_name']
        self.spreading = float(self.data['spreading'])
        self.phil = self.data['phil']
        self.num_reviews = self.data['num_reviews']"""
        # TODO more metrics
    def calc_new_spreading(self, new_spreading):
        """Takes in a list of new_spreading values and calulates a new average for them"""
        self.update_field('spreading', (sum(new_spreading) + self.get_value('spreading') * self.get_value('num_reviews')) / (self.get_value('num_reviews') + len(new_spreading)))
    def update_field(self, field, new_value):
        self.data[field] = new_value
        db.child('judges').child(self.guid).update({field :  new_value })
    @classmethod
    def create_blank_judge(cls, first_name, last_name):
        """Creates a blank judge given a name"""
        data = {
        "trad_aff_wr" : 0.0,
        "k_aff_wr" : 0.0,
        "trad_aff_num" : 0,
        "k_aff_num" : 0,
        "first_name" : first_name,
        "last_name" : last_name,
        "spreading" : 0.0,
        "num_reviews" : 0,
        "phil" : "I love Ashmita",
        "T" : {
                "T_num" : 0,
                "aff_wr" : 0.0,
                "we_meet_p" : 0.0,
                "aff_flex_outweighs" : 0.0,
                "reasonability_p" : 0.0,
                "condo_p" : 0.0
            },
        "K" : {
                "K_num" : 0,
                "aff_wr" : 0.0,
                "framework_wr" : 0.0,
                "perm_wr" : 0.0,
                "impact_turn_wr" : 0.0,
                "no_alt_solvency_wr" : 0.0,
                "case_outweights_wr" : 0.0,
                "condo_wr" : 0.0
        },
        "DA" : {
                "DA_num" : 0,
                "aff_wr" : 0.0,
                "case_outweights_wr" : 0.0,
                "no_link_wr" : 0.0,
                "link_turn_wr" : 0.0,
                "no_impact_wr" : 0.0,
                "impact_turn_wr" : 0.0,
                "condo_wr" : 0.0
        },
        "CP" : {
                "CP_num" : 0,
                "aff_wr" : 0.0,
                "perm_wr" : 0.0,
                "cp_theory_wr" : 0.0,
                "solvency_deficit" : 0.0,
                "offense_on_net_benefit" : 0.0,
                "links_to_net_benefit" : 0.0,
                "condo_wr" : 0.0
        },
        "impact_turn" : {
                "it_num" : 0,
                "aff_wr" : 0.0
        }
        }
        return cls.create_new_judge(data)
    def process_neg(self, up):
        choice = up.get_value('neg_choice')
        if choice.upper() == "IT":
            num = self.get_value("impact_turn")["it_num"] + 1
            if up.get_value('winner') == 'aff_win':
                wr = calc_p(self.get_value('impact_turn')['aff_wr'], num, won = True)
            else:
                wr = calc_p(self.get_value('impact_turn')['aff_wr'], num)
            dictk = {
                "it_num" : num,
                "aff_wr" : wr
            }
            self.update_field('impact_turn', dictk)
        if choice.upper() == "CP":
            num = self.get_value("CP")["CP_num"] + 1
            if up.get_value('winner') == 'aff_wins':
                wr = calc_p(self.get_value('CP')['aff_wr'], num, won = True)
            else:
                wr = calc_p(self.get_value('CP')['aff_wr'], num)
            if up.get_value('rfd') == "perm":
                perm = calc_p(self.get_value('CP')['perm_wr'], num, won = True)
            else:
                perm = calc_p(self.get_value('CP')['perm_wr'], num)
            if up.get_value('rfd') == 'theory':
                thr = calc_p(self.get_value('CP')['cp_theory_wr'], num, won = True)
            else:
                thr = calc_p(self.get_value('CP')['cp_theory_wr'], num)
            if up.get_value('rfd') == 'solvency_def':
                sol = calc_p(self.get_value('CP')['solvency_deficit'], num, won = True)
            else:
                sol = calc_p(self.get_value('CP')['solvency_deficit'], num)
            if up.get_value('rfd') == 'net_ben_offense':
                off = calc_p(self.get_value('CP')['offense_on_net_benefit'], num, won = True)
            else:
                off = calc_p(self.get_value('CP')['offense_on_net_benefit'], num)
            if up.get_value('rfd') == 'net_ben_links':
                links = calc_p(self.get_value('CP')['links_to_net_benefit'], num, won = True)
            else:
                links = calc_p(self.get_value('CP')['links_to_net_benefit'], num)
            if up.get_value('rfd') == 'condo':
                condo = calc_p(self.get_value('CP')['condo'], num, won = True)
            else:
                condo = calc_p(self.get_value('CP')['condo'], num)
            dirc = { "CP" : {
                    "CP_num" : num,
                    "aff_wr" : wr,
                    "perm_wr" : perm,
                    "cp_theory_wr" : thr,
                    "solvency_deficit" : sol,
                    "offense_on_net_benefit" : off,
                    "links_to_net_benefit" : links,
                    "condo_wr" : condo
                    }}
            self.update_field('CP', dirc)
        if choice.upper() == "K":
            num = self.get_value("K")["K_num"] + 1
            if up.get_value('winner') == 'aff_wins':
                wr = calc_p(self.get_value('K')['aff_wr'], num, won = True)
            else:
                wr = calc_p(self.get_value('K')['aff_wr'], num)
            if up.get_value('rfd') == "framework":
                frame = calc_p(self.get_value('K')['framework_wr'], num, won = True)
            else:
                frame = calc_p(self.get_value('K')['framework_wr'], num)
            if up.get_value('rfd') == 'perm':
                perm = calc_p(self.get_value('K')['perm_wr'], num, won = True)
            else:
                perm = calc_p(self.get_value('K')['perm_wr'], num)
            if up.get_value('rfd') == 'impact_turn':
                it = calc_p(self.get_value('K')['impact_turn_wr'], num, won = True)
            else:
                it = calc_p(self.get_value('K')['impact_turn_wr'], num)
            if up.get_value('rfd') == 'no_alt':
                sol = calc_p(self.get_value('K')['no_alt_solvency_wr'], num, won = True)
            else:
                sol = calc_p(self.get_value('K')['no_alt_solvency_wr'], num)
            if up.get_value('rfd') == 'case_outweights':
                links = calc_p(self.get_value('K')['case_outweights_wr'], num, won = True)
            else:
                links = calc_p(self.get_value('K')['case_outweights_wr'], num)
            if up.get_value('rfd') == 'condo':
                condo = calc_p(self.get_value('CP')['condo'], num, won = True)
            else:
                condo = calc_p(self.get_value('CP')['condo'], num)
            dirc = { "K" : {
                    "K_num" : num,
                    "aff_wr" : wr,
                    "framework_wr" : frame,
                    "perm_wr" : perm,
                    "impact_turn_wr" : it,
                    "no_alt_solvency_wr" : sol,
                    "case_outweights_wr" : links,
                    "condo_wr" : condo
                    }}
            self.update_field('K', dirc)

    def increment_field(self, field):
        self.update_field(field, self.get_value(field) + 1)
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
    def upload_exists(self):
        if self.data:
            return True
        return False
    @classmethod
    def get_next_upload(cls):
        #TODO DRY
        #TODO make this not cancer
        #TODO Error checking
        global last_upload
        last_upload += 1
        try:
            return cls(list(dict(db.child('user_uploads').order_by_child('upload_number').equal_to(last_upload).get().val().items()).keys())[0])
        except Exception as e:
            last_upload -= 1
            return None
        return cls(list(dict(db.child('user_uploads').order_by_child('upload_number').equal_to(last_upload).get().val().items()).keys())[0])
    @staticmethod
    def get_all_new_uploads():
        next_up = upload.get_next_upload()
        all_ups = []
        while next_up:
            all_ups.append(next_up)
            next_up = upload.get_next_upload()
        return all_ups
    def which_judge(self):
        """This method returns a judge object indicating which judge this upload is refering to"""
        return judge.init_judge_with_name(self.get_value('firstName'), self.get_value('lastName'))
    def process(self):
        jud = self.which_judge()
        jud.increment_field('num_reviews')
        num = jud.get_value('num_reviews')
        jud.update_field('spreading', ((num - 1) * jud.get_value('spreading') + int(self.get_value('speedPref'))) / num)
        if self.get_value('aff_type') == "aff_trad":
            print('t')
            jud.increment_field("trad_aff_num")
            if self.get_value('winner') == "aff_win":
                num = jud.get_value("trad_aff_num")
                jud.update_field('trad_aff_wr', ((num - 1) * jud.get_value('trad_aff_wr') + 1) / num)
            else:
                num = jud.get_value("trad_aff_num")
                jud.update_field('trad_aff_wr', ((num - 1) * jud.get_value('trad_aff_wr')) / num)
        if self.get_value('aff_type') == "aff_k":
            print('k')
            jud.increment_field("k_aff_num")
            if self.get_value('winner') == "aff_win":
                num = jud.get_value("k_aff_num")
                print(num)
                jud.update_field('k_aff_wr', calc_p(jud.get_value('k_aff_wr'), num, won = True))
            else:
                num = jud.get_value("k_aff_num")
                print(num)
                jud.update_field('k_aff_wr', calc_p(jud.get_value('k_aff_wr'), num))
            jud.process_neg(self)
