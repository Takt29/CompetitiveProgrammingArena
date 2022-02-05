import re
import sys
import time
from typing import Optional
from itertools import count
from datetime import datetime
from .submissions_loader import Submission, SubmissionLoader, SubmissionStatus


class AtCoderSubmissionLoader(SubmissionLoader):
    def _normalize_status(self, external_status: str) -> SubmissionStatus:
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
            (SubmissionStatus.WaitingForJudging, 'WJ'),
            (SubmissionStatus.WaitingForJudging, 'WR')
        ]

        for pattern in patterns:
            if pattern[1] == external_status:
                return pattern[0]

        if re.match(r'[0-9]', external_status):
            return SubmissionStatus.WaitingForJudging

        print('Unknown Status(AtCoder):', external_status, file=sys.stderr)

        return SubmissionStatus.Unknown

    def _get(self, since: Optional[datetime] = None) -> list[Submission]:
        contest_id = self.external_contest_id.split(':')[1]
        url = f'https://atcoder.jp/contests/{contest_id}/submissions'

        result: list[Submission] = []

        # 新しい順
        for page in count(1):
            html = self._request(f'{url}?page={page}')

            pattern = r'<tr>[^<]*<td[^>]*><time[^>]*>([0-9/: +-]+)</time></td>\s*<td><a\s*href=\"[^\"]*\/tasks/([^\"]*)\">[^<]*</a></td>\s*<td><a\s*href=\"/users/([^\"]*)\">[^<]*</a>\s*<[^>]*><[^>]*></span></a></td>\s*<td>\s*<a[^>]*>([^<]*)</a>\s*</td>\s*<td[^>]*data-id=\"([0-9]+)\">([^<]*)</td>\s*<td[^>]*>[^<]*</td>\s*<td[^>]*><span[^>]*>([^<]*)</span>'

            submissions = re.findall(pattern, html)

            if len(submissions) == 0:
                break

            break_flag = False

            for submission in submissions:
                [timestamp, task_id, user_id, language, submission_id,
                    score, status] = submission

                data = Submission(
                    id=int(submission_id),
                    external_user_id=user_id,
                    external_contest_id=self.external_contest_id,
                    score=round(float(score)) if re.match(
                        r'^\d+(\.\d+)?$', score) else 0,
                    status=self._normalize_status(status),
                    language=re.sub(r"\s*\(.*\)\s*", "", language),
                    external_task_id=f'atcoder:{contest_id}:{task_id}',
                    external_submission_id=f'atcoder:{contest_id}:{submission_id}',
                    submitted_at=datetime.strptime(
                        timestamp, '%Y-%m-%d %H:%M:%S%z')
                )

                if data.status == SubmissionStatus.WaitingForJudging:
                    result = []
                    continue

                if self.latest_id and data.id <= self.latest_id:
                    break_flag = True
                    break

                if since is not None and data.submitted_at < since:
                    break_flag = True
                    break

                if len(result) > 0 and result[-1].id <= data.id:
                    continue

                result.append(data)

            if break_flag:
                break

            time.sleep(3)

        return result
