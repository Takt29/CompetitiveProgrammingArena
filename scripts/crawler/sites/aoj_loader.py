import sys
import traceback
import json
from typing import Optional
from datetime import datetime, timezone
from .submissions_loader import Submission, SubmissionLoader, SubmissionStatus


class AOJSubmissionLoader(SubmissionLoader):
    def _normalize_status(self, external_status: str) -> SubmissionStatus:
        patterns: list[tuple[SubmissionStatus, int]] = [
            (SubmissionStatus.CompileError, 0),
            (SubmissionStatus.WrongAnswer, 1),
            (SubmissionStatus.TimeLimitExceeded, 2),
            (SubmissionStatus.MemoryLimitExceeded, 3),
            (SubmissionStatus.Accepted, 4),
            (SubmissionStatus.WaitingForJudging, 5),
            (SubmissionStatus.OutputLimitExceeded, 6),
            (SubmissionStatus.RuntimeError, 7),
            (SubmissionStatus.PresentationError, 8),
            (SubmissionStatus.WaitingForJudging, 9),
        ]

        for pattern in patterns:
            if pattern[1] == int(external_status):
                return pattern[0]

        if int(external_status) < 0:
            return SubmissionStatus.InternalError

        print('Unknown Status(AOJ):', external_status, file=sys.stderr)

        return SubmissionStatus.Unknown

    def _get(self, since: Optional[datetime] = None) -> list[Submission]:
        url = 'https://judgeapi.u-aizu.ac.jp/submission_records/recent'

        result: list[Submission] = []

        submissions_json = self._request(url)
        submissions = json.loads(submissions_json)
        submissions.sort(key=lambda x: x['judgeId'])

        # 古い順
        for submission in submissions:

            submission_id = int(submission['judgeId'])
            contest_id = ''
            user_id = submission['userId']
            task_id = submission['problemId']
            timestamp = int(submission['submissionDate']) / 1000.0
            status = str(submission['status'])
            language = str(submission['language'])
            score = 1 if self._normalize_status(
                status) == SubmissionStatus.Accepted else 0

            data = Submission(
                id=submission_id,
                external_user_id=user_id,
                external_contest_id=contest_id,
                score=score,
                status=self._normalize_status(status),
                language=language,
                external_task_id=f'aoj:{contest_id}:{task_id}',
                external_submission_id=f'aoj:{contest_id}:{submission_id}',
                submitted_at=datetime.fromtimestamp(
                    timestamp, tz=timezone.utc)
            )

            if data.status == SubmissionStatus.WaitingForJudging:
                break

            if self.latest_id and data.id <= self.latest_id:
                continue

            if since is not None and data.submitted_at < since:
                continue

            result.append(data)

        return result
