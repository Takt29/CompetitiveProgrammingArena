#! /usr/bin/env python3

import sys
import io
import traceback
from os.path import join, dirname
from dotenv import load_dotenv
from firestore import firestore
from firestore.contests_loader import ContestsLoader
from firestore.tasks_loader import TasksLoader
from utils import scheduler

# set default encoding
# ---------------------------------
sys.stdin = io.TextIOWrapper(sys.stdin.buffer,  encoding='utf-8')
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# loading env
# ---------------------------------
dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)


def update_submissions():
    print('update_submissions', flush=True)


class Main():
    def __init__(self):
        self.contests_loader = ContestsLoader()
        self.tasks_loader = TasksLoader()
        pass

    def run(self):
        try:
            self.contests_loader.sync()
            self.tasks_loader.set_contest_ids([
                item['id'] for item in self.contests_loader.get_data()
            ])
            self.tasks_loader.sync()

            print(self.contests_loader.get_data())
            print(self.tasks_loader.get_data())

            update_submissions()
        except Exception as e:
            print(traceback.format_exc(), file=sys.stderr, flush=True)


if __name__ == '__main__':
    firestore.init()

    main = Main()

    scheduler.scheduler(main.run, 15, 5)
