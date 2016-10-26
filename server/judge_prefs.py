"""This is the "main script" which will be run and from where the actual work will be done"""
from judge import upload
from judge import judge
from sites import tabroom
from sites import judge_phil
from global_vars import db
import getopt, sys
def remove_dup(arg):
    name = arg.split(" ")
    all_judges_first = db.child('judges').order_by_child('first_name').equal_to(name[0]).get().val().items()
    all_judges_last = db.child('judges').order_by_child('last_name').equal_to(name[1]).get().val().items()
    all_judges = [judge for judge in all_judges_last if judge in all_judges_first]
    if len(all_judges) > 1:
        print(arg, len(all_judges))
        for jud in all_judges[1:]:
            db.child('judges').child(jud[0]).remove()
def main(argv):
    opts, args = getopt.getopt(argv,"upd:",['remove_all_dups', 'update-phil', 'get-id='])
    for opt, arg in opts:
        if opt == '--get-id':
            #TODO Consider stroing  jud id in firebase
            name = arg.split(" ")
            tb = tabroom()
            for i in range(283, 57630):
                print(i)
                tb.query_for_judge(jud_id = i)
                if tb.get_judge_name()[0].lower() == name[0].lower() and tb.get_judge_name:
                    print('jud_id is ' + str(i))
                    exit()
            print('judge_not_found')
            exit()
        if opt == '--update-phil':
            all_judges = list(db.child('judges').get().val().items())
            print('downloaded')
            tb = tabroom()
            for key, data in all_judges:
                try:
                    print(key, data['first_name'], data['last_name'])
                    if data['phil'].lower() == 'i love ashmita' or data['phil'].lower() == "no paradigm found":
                        print('     looking up paradigm')
                        if tb.update_judge_phil(data['first_name'], data['last_name']):
                            print('phil not found')
                        else:
                            print('phil found')
                    else:
                        print('     paradigm already known')
                except:
                    print('fml')
            exit()
        if opt == '-p':
            #Process uploads mode
            all_new_ups = upload.get_all_new_uploads()
            for up in all_new_ups:
                try:
                    up.process()
                except Exception as e:
                    #Assumes judge doesn't exist
                    # TODO: intelligent exceptions
                    fn, ls = up.get_value('firstName'), up.get_value('lastName')
                    judge.create_blank_judge(fn, ls)



        if opt == '-u':
            #Update mode = add info on all judges
            tabroom.create_all_judges()
            exit()
        if opt == '-d':
            #remove duplicates mode with arg as the "First Last" name
            remove_dup(arg)
            exit()
        if opt == '--remove_all_dups':
            all_judges = list(db.child('judges').get().val().items())
            print('downloaded')
            judges_data = [jud[1] for jud in all_judges]
            print(len(all_judges))
            for judge_data in judges_data:
                remove_dup(judge_data['first_name'] + " " + judge_data['last_name'])
            # names = [judge_data['first_name'] + " " + judge_data['last_name'] for judge_data in judges_data]
            # for name in names:
            #     remove_dup(name) This fails with names = [judge_data['first_name'] + " " + judge_data['last_name'] for judge_data in judges_data]
            #TypeError: string indices must be integers

            exit()
if __name__ == "__main__":
   main(sys.argv[1:])
