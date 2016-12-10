import pyrebase #import pyrebase
import datetime #import datetime
import time #import time

config = { #sets up judge-prefs-pfd firebase
  "apiKey": "apiKey",
  "authDomain": "judge-prefs.firebaseapp.com",
  "databaseURL": "https://judge-prefs.firebaseio.com/",
  "storageBucket": "judge-prefs.appspot.com"
}

firebase = pyrebase.initialize_app(config) #initializes app

db = firebase.database() #sets db as database variable

for upload in db.child('user_uploads').get().each(): #iterates over database of user uploads

    new = {} #initializes new judge dictionary
    newcomments = {} #initializes judge comments dictionary
    firstName = upload.val()['firstName'] #sets full name variable based on upload
    lastName = upload.val()['lastName']

    jid = "doesnotexist" #assigns that judge does not exist
    for jud in db.child('judges').order_by_child('first_name').equal_to(firstName).get().each(): #finds matching judge
        if (jud.val()['last_name'] == lastName):
            jid = jud.key() #assigns judge key to jid variable

    if (jid != "doesnotexist"): #only processes if judge exists

        print(jid);

        jold = firebase.database().child('judges').child(jid).get() #downloads judge

        com = False;

        for field in db.child('user_uploads').child(upload.key()).get().each(): #finds matching judge
            if field.key() == 'comments':
                com = True;

        if (com):
            if (upload.val()['comments'] != "-1"):
                newcomments['first_name'] = firstName #creates name for new judge
                newcomments['last_name'] = lastName
                newcomments['comments'] = upload.val()['comments'] #adds comments
                ts = time.time() #does something
                newcomments['timestamp'] = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S') #timestamps comment
                db.child('comments').push(newcomments) #updates comments

        new['first_name'] = firstName #creates fields for new judge
        new['last_name'] = lastName
        new['phil'] = jold.val()['phil']
        new['num_reviews'] = jold.val()['num_reviews'] + 1

        new['spreading'] = ((jold.val()['spreading']) * (jold.val()['num_reviews']) + float(upload.val()['speedPref'])) / (new['num_reviews'])

        if (upload.val()['aff_type'] == 'aff_trad'):
            new['trad_aff_num'] = (jold.val()['trad_aff_num']) + 1
            if (upload.val()['winner'] == 'aff_win'):
                new['trad_aff_wr'] = (((jold.val()['trad_aff_wr']) * (jold.val()['trad_aff_num'])) + 1) / (new['trad_aff_num'])
            else:
                new['trad_aff_wr'] = (((jold.val()['trad_aff_wr']) * (jold.val()['trad_aff_num']))) / (new['trad_aff_num'])
        else:
            new['k_aff_num'] = (jold.val()['k_aff_num']) + 1
            if (upload.val()['winner'] == 'aff_win'):
                new['k_aff_wr'] = (((jold.val()['k_aff_wr']) * (jold.val()['k_aff_num'])) + 1) / (new['k_aff_num'])
            else:
                new['k_aff_wr'] = (((jold.val()['k_aff_wr']) * (jold.val()['k_aff_num']))) / (new['k_aff_num'])

        new['CP'] = {}
        new['DA'] = {}
        new['K'] = {}
        new['T'] = {}
        new['impact_turn'] = {}

        if (upload.val()['neg_choice'] == 'k'):
            new['DA'] = jold.val()['DA']
            new['T'] = jold.val()['T']
            new['impact_turn'] = jold.val()['impact_turn']
            new['CP'] = jold.val()['CP']

            new['K']['K_num'] = (jold.val()['K']['K_num']) + 1

            if (upload.val()['winner'] == 'aff_win'):
                new['K']['aff_wr'] = ((jold.val()['K']['aff_wr']) * (jold.val()['K']['K_num']) + 1) / (new['K']['K_num'])
            else:
                new['K']['aff_wr'] = ((jold.val()['K']['aff_wr']) * (jold.val()['K']['K_num'])) / (new['K']['K_num'])

            if (upload.val()['rfd'] == 'framework'):
                new['K']['framework_wr'] = ((jold.val()['K']['framework_wr']) * (jold.val()['K']['K_num']) + 1) / (new['K']['K_num'])
            else:
                new['K']['framework_wr'] = ((jold.val()['K']['framework_wr']) * (jold.val()['K']['K_num'])) / (new['K']['K_num'])

            if (upload.val()['rfd'] == 'perm'):
                new['K']['perm_wr'] = ((jold.val()['K']['perm_wr']) * (jold.val()['K']['K_num']) + 1) / (new['K']['K_num'])
            else:
                new['K']['perm_wr'] = ((jold.val()['K']['perm_wr']) * (jold.val()['K']['K_num'])) / (new['K']['K_num'])

            if (upload.val()['rfd'] == 'impact_turn'):
                new['K']['impact_turn_wr'] = ((jold.val()['K']['impact_turn_wr']) * (jold.val()['K']['K_num']) + 1) / (new['K']['K_num'])
            else:
                new['K']['impact_turn_wr'] = ((jold.val()['K']['impact_turn_wr']) * (jold.val()['K']['K_num'])) / (new['K']['K_num'])

            if (upload.val()['rfd'] == 'no_alt'):
                new['K']['no_alt_solvency_wr'] = ((jold.val()['K']['no_alt_solvency_wr']) * (jold.val()['K']['K_num']) + 1) / (new['K']['K_num'])
            else:
                new['K']['no_alt_solvency_wr'] = ((jold.val()['K']['no_alt_solvency_wr']) * (jold.val()['K']['K_num'])) / (new['K']['K_num'])

            if (upload.val()['rfd'] == 'case_outweighs'):
                new['K']['case_outweights_wr'] = ((jold.val()['K']['case_outweights_wr']) * (jold.val()['K']['K_num']) + 1) / (new['K']['K_num'])
            else:
                new['K']['case_outweights_wr'] = ((jold.val()['K']['case_outweights_wr']) * (jold.val()['K']['K_num'])) / (new['K']['K_num'])

            if (upload.val()['rfd'] == 'condo'):
                new['K']['condo_wr'] = ((jold.val()['K']['condo_wr']) * (jold.val()['K']['K_num']) + 1) / (new['K']['K_num'])
            else:
                new['K']['condo_wr'] = ((jold.val()['K']['condo_wr']) * (jold.val()['K']['K_num'])) / (new['K']['K_num'])


        elif (upload.val()['neg_choice'] == 'cp'):
            new['DA'] = jold.val()['DA']
            new['T'] = jold.val()['T']
            new['impact_turn'] = jold.val()['impact_turn']
            new['K'] = jold.val()['K']

            new['CP']['CP_num'] = (jold.val()['CP']['CP_num']) + 1

            if (upload.val()['winner'] == 'aff_win'):
                new['CP']['aff_wr'] = ((jold.val()['CP']['aff_wr']) * (jold.val()['CP']['CP_num']) + 1) / (new['CP']['CP_num'])
            else:
                new['CP']['aff_wr'] = ((jold.val()['CP']['aff_wr']) * (jold.val()['CP']['CP_num'])) / (new['CP']['CP_num'])

            if (upload.val()['rfd'] == 'perm'):
                new['CP']['perm_wr'] = ((jold.val()['CP']['perm_wr']) * (jold.val()['CP']['CP_num']) + 1) / (new['CP']['CP_num'])
            else:
                new['CP']['perm_wr'] = ((jold.val()['CP']['perm_wr']) * (jold.val()['CP']['CP_num'])) / (new['CP']['CP_num'])

            if (upload.val()['rfd'] == 'theory'):
                new['CP']['cp_theory_wr'] = ((jold.val()['CP']['cp_theory_wr']) * (jold.val()['CP']['CP_num']) + 1) / (new['CP']['CP_num'])
            else:
                new['CP']['cp_theory_wr'] = ((jold.val()['CP']['cp_theory_wr']) * (jold.val()['CP']['CP_num'])) / (new['CP']['CP_num'])

            if (upload.val()['rfd'] == 'solvency_def'):
                new['CP']['solvency_deficit'] = ((jold.val()['CP']['solvency_deficit']) * (jold.val()['CP']['CP_num']) + 1) / (new['CP']['CP_num'])
            else:
                new['CP']['solvency_deficit'] = ((jold.val()['CP']['solvency_deficit']) * (jold.val()['CP']['CP_num'])) / (new['CP']['CP_num'])

            if (upload.val()['rfd'] == 'net_ben_offense'):
                new['CP']['offense_on_net_benefit'] = ((jold.val()['CP']['offense_on_net_benefit']) * (jold.val()['CP']['CP_num']) + 1) / (new['CP']['CP_num'])
            else:
                new['CP']['offense_on_net_benefit'] = ((jold.val()['CP']['offense_on_net_benefit']) * (jold.val()['CP']['CP_num'])) / (new['CP']['CP_num'])

            if (upload.val()['rfd'] == 'net_ben_links'):
                new['CP']['links_to_net_benefit'] = ((jold.val()['CP']['links_to_net_benefit']) * (jold.val()['CP']['CP_num']) + 1) / (new['CP']['CP_num'])
            else:
                new['CP']['links_to_net_benefit'] = ((jold.val()['CP']['links_to_net_benefit']) * (jold.val()['CP']['CP_num'])) / (new['CP']['CP_num'])

            if (upload.val()['rfd'] == 'condo'):
                new['CP']['condo_wr'] = ((jold.val()['CP']['condo_wr']) * (jold.val()['CP']['CP_num']) + 1) / (new['CP']['CP_num'])
            else:
                new['CP']['condo_wr'] = ((jold.val()['CP']['condo_wr']) * (jold.val()['CP']['CP_num'])) / (new['CP']['CP_num'])

        elif (upload.val()['neg_choice'] == 'da'):
            new['K'] = jold.val()['K']
            new['T'] = jold.val()['T']
            new['impact_turn'] = jold.val()['impact_turn']
            new['CP'] = jold.val()['CP']

            new['DA']['DA_num'] = (jold.val()['DA']['DA_num']) + 1

            if (upload.val()['winner'] == 'aff_win'):
                new['DA']['aff_wr'] = ((jold.val()['DA']['aff_wr']) * (jold.val()['DA']['DA_num']) + 1) / (new['DA']['DA_num'])
            else:
                new['DA']['aff_wr'] = ((jold.val()['DA']['aff_wr']) * (jold.val()['DA']['DA_num'])) / (new['DA']['DA_num'])

            if (upload.val()['rfd'] == 'case_outweighs'):
                new['DA']['case_outweights_wr'] = ((jold.val()['DA']['case_outweights_wr']) * (jold.val()['DA']['DA_num']) + 1) / (new['DA']['DA_num'])
            else:
                new['DA']['case_outweights_wr'] = ((jold.val()['DA']['case_outweights_wr']) * (jold.val()['DA']['DA_num'])) / (new['DA']['DA_num'])

            if (upload.val()['rfd'] == 'no_link_thumpers'):
                new['DA']['no_link_wr'] = ((jold.val()['DA']['no_link_wr']) * (jold.val()['DA']['DA_num']) + 1) / (new['DA']['DA_num'])
            else:
                new['DA']['no_link_wr'] = ((jold.val()['DA']['no_link_wr']) * (jold.val()['DA']['DA_num'])) / (new['DA']['DA_num'])

            if (upload.val()['rfd'] == 'link_turn'):
                new['DA']['link_turn_wr'] = ((jold.val()['DA']['link_turn_wr']) * (jold.val()['DA']['DA_num']) + 1) / (new['DA']['DA_num'])
            else:
                new['DA']['link_turn_wr'] = ((jold.val()['DA']['link_turn_wr']) * (jold.val()['DA']['DA_num'])) / (new['DA']['DA_num'])

            if (upload.val()['rfd'] == 'no_impact'):
                new['DA']['no_impact_wr'] = ((jold.val()['DA']['no_impact_wr']) * (jold.val()['DA']['DA_num']) + 1) / (new['DA']['DA_num'])
            else:
                new['DA']['no_impact_wr'] = ((jold.val()['DA']['no_impact_wr']) * (jold.val()['DA']['DA_num'])) / (new['DA']['DA_num'])

            if (upload.val()['rfd'] == 'impact_turn'):
                new['DA']['impact_turn_wr'] = ((jold.val()['DA']['impact_turn_wr']) * (jold.val()['DA']['DA_num']) + 1) / (new['DA']['DA_num'])
            else:
                new['DA']['impact_turn_wr'] = ((jold.val()['DA']['impact_turn_wr']) * (jold.val()['DA']['DA_num'])) / (new['DA']['DA_num'])

            if (upload.val()['rfd'] == 'condo'):
                new['DA']['condo_wr'] = ((jold.val()['DA']['condo_wr']) * (jold.val()['DA']['DA_num']) + 1) / (new['DA']['DA_num'])
            else:
                new['DA']['condo_wr'] = ((jold.val()['DA']['condo_wr']) * (jold.val()['DA']['DA_num'])) / (new['DA']['DA_num'])

        elif (upload.val()['neg_choice'] == 't'):
            new['DA'] = jold.val()['DA']
            new['K'] = jold.val()['K']
            new['impact_turn'] = jold.val()['impact_turn']
            new['CP'] = jold.val()['CP']

            new['T']['T_num'] = (jold.val()['T']['T_num']) + 1

            if (upload.val()['winner'] == 'aff_win'):
                new['T']['aff_wr'] = ((jold.val()['T']['aff_wr']) * (jold.val()['T']['T_num']) + 1) / (new['T']['T_num'])
            else:
                new['T']['aff_wr'] = ((jold.val()['T']['aff_wr']) * (jold.val()['T']['T_num'])) / (new['T']['T_num'])

            if (upload.val()['rfd'] == 'we_meet'):
                new['T']['we_meet_p'] = ((jold.val()['T']['we_meet_p']) * (jold.val()['T']['T_num']) + 1) / (new['T']['T_num'])
            else:
                new['T']['we_meet_p'] = ((jold.val()['T']['we_meet_p']) * (jold.val()['T']['T_num'])) / (new['T']['T_num'])

            if (upload.val()['rfd'] == 'aff_flex'):
                new['T']['aff_flex_outweighs'] = ((jold.val()['T']['aff_flex_outweighs']) * (jold.val()['T']['T_num']) + 1) / (new['T']['T_num'])
            else:
                new['T']['aff_flex_outweighs'] = ((jold.val()['T']['aff_flex_outweighs']) * (jold.val()['T']['T_num'])) / (new['T']['T_num'])

            if (upload.val()['rfd'] == 'reasonability'):
                new['T']['reasonability_p'] = ((jold.val()['T']['reasonability_p']) * (jold.val()['T']['T_num']) + 1) / (new['T']['T_num'])
            else:
                new['T']['reasonability_p'] = ((jold.val()['T']['reasonability_p']) * (jold.val()['T']['T_num'])) / (new['T']['T_num'])

            if (upload.val()['rfd'] == 'condo'):
                new['T']['condo_p'] = ((jold.val()['T']['condo_p']) * (jold.val()['T']['T_num']) + 1) / (new['T']['T_num'])
            else:
                new['T']['condo_p'] = ((jold.val()['T']['condo_p']) * (jold.val()['T']['T_num'])) / (new['T']['T_num'])

        elif (upload.val()['neg_choice'] == 'it'):
            new['DA'] = jold.val()['DA']
            new['T'] = jold.val()['T']
            new['K'] = jold.val()['K']
            new['CP'] = jold.val()['CP']

            new['impact_turn']['it_num'] = (jold.val()['impact_turn']['it_num']) + 1

            if (upload.val()['winner'] == 'aff_win'):
                new['impact_turn']['aff_wr'] = ((jold.val()['impact_turn']['aff_wr']) * (jold.val()['impact_turn']['it_num']) + 1) / (new['impact_turn']['it_num'])
            else:
                new['impact_turn']['aff_wr'] = ((jold.val()['impact_turn']['aff_wr']) * (jold.val()['impact_turn']['it_num'])) / (new['impact_turn']['it_num'])

        db.child('judges').child(jid).update(new) #updates judge database

    db.child('user_uploads').child(upload.key()).remove() #removes judge from user uploads
