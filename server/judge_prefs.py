"""This is the "main script" which will be run and from where the actual work will be done"""
from judge import upload
from sites import tabroom
import getopt, sys
def main(argv):
    opts, args = getopt.getopt(argv,"u",[])
    for opt, arg in opts:
        if opt == '-u':
            #Update mode = add info on all judges
            tabroom.create_all_judges()
if __name__ == "__main__":
   main(sys.argv[1:])

all_new_ups = upload.get_all_new_uploads()
for up in all_new_ups:
    up.process()
