#! /usr/bin/env python3

from datetime import datetime, timezone
import sys
import io
import traceback
import time
from os.path import join, dirname
from dotenv import load_dotenv
from firestore import firestore
from firestore.contests_loader import ContestsLoader
from firestore.tasks_loader import TasksLoader
from firestore.user_loader import UsersLoader
from sites.aoj_loader import AOJSubmissionLoader
from sites.codeforces_loader import CodeforcesSubmissionLoader
from sites.submissions_loader import SubmissionLoader
from sites.atcoder_loader import AtCoderSubmissionLoader
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


def task_id_to_contest_id(task_id: str) -> str:
    [site, contest_id] = task_id.split(":")[0:2]

    if site == 'atcoder':
        return f'{site}:{contest_id}'
    else:
        return f'{site}:'


class Main():
    contests_loader: ContestsLoader
    tasks_loader: TasksLoader
    users_loader: UsersLoader
    submission_loaders: dict[str, SubmissionLoader]

    def __init__(self):
        self.contests_loader = ContestsLoader()
        self.tasks_loader = TasksLoader()
        self.users_loader = UsersLoader()
        self.submission_loaders = dict()
        pass

    def run(self):
        try:
            self.contests_loader.sync()
            self.tasks_loader.set_contest_ids([
                item['id'] for item in self.contests_loader.get_data()
            ])
            self.tasks_loader.sync()
            self.users_loader.sync()

            tasks = self.tasks_loader.get_data()

            external_contest_ids = list(set([
                task_id_to_contest_id(task['externalTaskId']) for task in tasks
            ]))

            print(external_contest_ids, flush=True)

            since = datetime(2022, 2, 2, tzinfo=timezone.utc)

            for external_contest_id in external_contest_ids:
                site = external_contest_id.split(":")[0]

                if external_contest_id not in self.submission_loaders:
                    if site == 'atcoder':
                        self.submission_loaders[external_contest_id] = AtCoderSubmissionLoader(
                            external_contest_id)
                    elif site == 'codeforces':
                        self.submission_loaders[external_contest_id] = CodeforcesSubmissionLoader(
                            external_contest_id)
                    elif site == 'aoj':
                        self.submission_loaders[external_contest_id] = AOJSubmissionLoader(
                            external_contest_id)
                    else:
                        print("Unknown Site: ",
                              external_contest_id, file=sys.stderr)
                        continue

                print(external_contest_id, flush=True)

                submissions = self.submission_loaders[external_contest_id].get(
                    since=since)

                print(len(submissions), flush=True)

                time.sleep(4)

            # print(self.contests_loader.get_data())
            # print(self.tasks_loader.get_data())
            # print(self.users_loader.get_data())

            update_submissions()
        except Exception as e:
            print(traceback.format_exc(), file=sys.stderr, flush=True)


if __name__ == '__main__':
    firestore.init()

    main = Main()

    scheduler.scheduler(main.run, 15, 5)
