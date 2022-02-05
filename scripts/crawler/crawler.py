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
from sites.submissions_loader import Submission
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


def task_id_to_contest_id(task_id: str) -> str:
    [site, contest_id] = task_id.split(":")[0:2]

    if site == 'atcoder':
        return f'{site}:{contest_id}'
    else:
        return f'{site}:'


def generate_sites_info(contests, tasks):
    contest_dict = {
        contest['id']: contest for contest in contests
    }

    result = dict()

    for task in tasks:
        external_contest_id = task_id_to_contest_id(task['externalTaskId'])
        contest = contest_dict[task['contestId']]

        if external_contest_id not in result:
            result[external_contest_id] = {
                'external_contest_id': external_contest_id,
                'since': contest['startAt'],
                'contest_ids': [],
            }

        if result[external_contest_id]['since'] > contest['startAt']:
            result[external_contest_id]['since'] = contest['startAt']

        result[external_contest_id]['contest_ids'].append((
            task['contestId'],
            task['id'],
        ))

    return list(result.values())


def add_submissions(submissions: list[Submission], contest_ids: list[any], users: list[any]):
    atcoder_id_dict = {
        user['externalAccountId']['atcoder']: user['id'] for user in list(filter(
            lambda user: 'atcoder' in user['externalAccountId'] and user['externalAccountId']['atcoder'],
            users
        ))
    }

    aoj_id_dict = {
        user['externalAccountId']['aoj']: user['id'] for user in filter(
            lambda user: 'aoj' in user['externalAccountId'],
            users
        )
    }

    codeforces_id_dict = {
        user['externalAccountId']['codeforces']: user['id'] for user in filter(
            lambda user: 'codeforces' in user['externalAccountId'],
            users
        )
    }

    db = firestore.connect()

    for submission in submissions:
        site = submission.external_submission_id.split(":")[0]
        submittedBy = None

        if site == 'atcoder':
            submittedBy = atcoder_id_dict.get(submission.external_user_id)
        elif site == 'codeforces':
            submittedBy = codeforces_id_dict.get(submission.external_user_id)
        elif site == 'aoj':
            submittedBy = aoj_id_dict.get(submission.external_user_id)

        if submittedBy is None:
            continue

        for contest_id in contest_ids:
            data = {
                'contestId': contest_id[0],
                'taskId': contest_id[1],
                'status': submission.status,
                'score': submission.score,
                'language': submission.language,
                'submittedAt': submission.submitted_at,
                'submittedBy': submittedBy,
                'externalSubmissionId': submission.external_submission_id,
            }

            doc_ref = db.collection('submissions').document()
            doc_ref.set(data)


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

    def __get_tasks(self, contest_ids=None, update=True):
        if contest_ids is not None:
            self.tasks_loader.set_contest_ids(contest_ids)

        if update:
            self.tasks_loader.sync()

        return self.tasks_loader.get_data()

    def __get_contests(self, update=True):
        if update:
            self.contests_loader.sync()

        return self.contests_loader.get_data()

    def __get_users(self, update=True):
        if update:
            self.users_loader.sync()

        return self.users_loader.get_data()

    def __get_submissions(self, external_contest_id, since) -> list[Submission]:
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
                print("Unknown Site: ", external_contest_id, file=sys.stderr)
                return []

        return self.submission_loaders[external_contest_id].get(since=since)

    def run(self):
        try:
            contests = self.__get_contests()

            tasks = self.__get_tasks(contest_ids=[
                contest['id'] for contest in contests
            ])
            users = self.__get_users()

            sites_info = generate_sites_info(contests, tasks)

            print(sites_info, flush=True)

            for item in sites_info:
                external_contest_id = item['external_contest_id']
                submissions = self.__get_submissions(
                    external_contest_id, item['since'])

                print(external_contest_id, len(submissions), flush=True)

                add_submissions(submissions, item['contest_ids'], users)

                time.sleep(3)
        except Exception as e:
            print(traceback.format_exc(), file=sys.stderr, flush=True)


if __name__ == '__main__':
    firestore.init()

    main = Main()

    scheduler.scheduler(main.run, 15, 5)
