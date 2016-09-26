"""This is the "main script" which will be run and from where the actual work will be done"""
from judge import upload
from sites import tabroom
from global_vars import db
import getopt, sys
def main(argv):
    opts, args = getopt.getopt(argv,"ud:",[])
    for opt, arg in opts:
        if opt == '-u':
            #Update mode = add info on all judges
            tabroom.create_all_judges()
            exit()
        if opt == '-d':
            #remove duplicates mode with arg as the "First Last" name
            name = arg.split(" ")
            all_judges_first = db.child('judges').order_by_child('first_name').equal_to(name[0]).get().val().items()
            all_judges_last = db.child('judges').order_by_child('last_name').equal_to(name[1]).get().val().items()
            all_judges = [judge for judge in all_judges_last if judge in all_judges_first]
            if len(all_judges) > 1:
                print(len(all_judges))
                for jud in all_judges[1:]:
                    db.child('judges').child(jud[0]).remove()
            exit()
if __name__ == "__main__":
   main(sys.argv[1:])

all_new_ups = upload.get_all_new_uploads()
for up in all_new_ups:
    up.process()
