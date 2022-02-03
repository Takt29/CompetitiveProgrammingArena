import re
import sys
import time
import traceback
from typing import Optional
from itertools import count
from urllib.request import urlopen
from datetime import datetime
from .submissions_loader import SubmissionLoader, SubmissionStatus, SubmissionType


class AtCoderSubmissionLoader(SubmissionLoader):
    def _normalize_status(self, external_status: str) -> str:
        patterns: list[tuple[SubmissionStatus, str]] = [
            (SubmissionStatus.CompileError, 'CE'),
            (SubmissionStatus.WrongAnswer, 'WA'),
            (SubmissionStatus.TimeLimitExceeded, 'TLE'),
            (SubmissionStatus.MemoryLimitExceeded, 'MLE'),
            (SubmissionStatus.Accepted, 'AC'),
            (SubmissionStatus.OutputLimitExceeded, 'OLE'),
            (SubmissionStatus.RuntimeError, 'RE'),
            (SubmissionStatus.PresentationError, 'PE'),
            (SubmissionStatus.InternalError, 'IE'),
        ]

        for pattern in patterns:
            if pattern[1] == external_status:
                return pattern[0].value

        return external_status

    def get(self, since: Optional[datetime] = None) -> list[SubmissionType]:
        contest_id = self.external_contest_id.split(':')[1]
        url = f'https://atcoder.jp/contests/{contest_id}/submissions'

        result: list[SubmissionType] = []

        try:
            page = 1

            # 新しい順
            for page in count(1):
                html = urlopen(
                    url=f'{url}?page={page}',
                    timeout=10
                ).read().decode('utf-8')

                pattern = r'<tr>[^<]*<td[^>]*><time[^>]*>([0-9/: +-]+)</time></td>\s*<td><a\s*href=\"[^\"]*\/tasks/([^\"]*)\">[^<]*</a></td>\s*<td><a\s*href=\"/users/([^\"]*)\">[^<]*</a>\s*<[^>]*><[^>]*></span></a></td>\s*<td>\s*<a[^>]*>[^<]*</a>\s*</td>\s*<td[^>]*data-id=\"([0-9]+)\">([^<]*)</td>\s*<td[^>]*>[^<]*</td>\s*<td[^>]*><span[^>]*>([^<]*)</span>'

                submissions = re.findall(pattern, html)

                if len(submissions) == 0:
                    break

                break_flag = False

                for submission in submissions:
                    [timestamp, task_id, user_id, submission_id,
                        score, status] = submission

                    data: SubmissionType = ({
                        'id': int(submission_id),
                        'external_user_id': user_id,
                        'external_contest_id': self.external_contest_id,
                        'score': round(float(score)) if re.match(r'^\d+(\.\d+)?$', score) else 0,
                        'status': self._normalize_status(status),
                        'external_task_id': f'atcoder:{contest_id}:{task_id}',
                        'external_submission_id': f'atcoder:{contest_id}:{submission_id}',
                        'submitted_at': datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S%z')
                    })

                    print(data['status'])

                    if data['status'] == 'WJ' or re.match(r'[0-9]', data['status']):
                        result = []
                        continue

                    if self.latest_id and data['id'] <= self.latest_id:
                        break_flag = True
                        continue

                    if since is not None and data['submitted_at'] < since:
                        break_flag = True
                        continue

                    if len(result) > 0 and result[-1]['id'] <= data['id']:
                        continue

                    result.append(data)

                if break_flag:
                    break

                time.sleep(3)

        except Exception as e:
            print(traceback.format_exc(), file=sys.stderr, flush=True)
            result = []

        for item in result:
            if self.latest_id is None or self.latest_id < item['id']:
                self.latest_id = item['id']

        return result
