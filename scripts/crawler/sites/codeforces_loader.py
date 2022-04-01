import sys
import json
from typing import Optional
from datetime import datetime, timezone
from .submissions_loader import Submission, SubmissionLoader, SubmissionStatus


class CodeforcesSubmissionLoader(SubmissionLoader):
    def _normalize_status(self, external_status: str) -> SubmissionStatus:
        patterns: list[tuple[SubmissionStatus, str]] = [
            (SubmissionStatus.CompileError, 'COMPILATION_ERROR'),
            (SubmissionStatus.WrongAnswer, 'WRONG_ANSWER'),
            (SubmissionStatus.TimeLimitExceeded, 'TIME_LIMIT_EXCEEDED'),
            (SubmissionStatus.MemoryLimitExceeded, 'MEMORY_LIMIT_EXCEEDED'),
            (SubmissionStatus.Accepted, 'OK'),
            (SubmissionStatus.RuntimeError, 'RUNTIME_ERROR'),
            (SubmissionStatus.PresentationError, 'PRESENTATION_ERROR'),
            (SubmissionStatus.WaitingForJudging, 'TESTING'),
            (SubmissionStatus.TimeLimitExceeded, 'IDLENESS_LIMIT_EXCEEDED'),
            (SubmissionStatus.WrongAnswer, 'PARTIAL'),
            (SubmissionStatus.InternalError, 'CRASHED'),
        ]

        for pattern in patterns:
            if pattern[1] == external_status:
                return pattern[0]

        print('Unknown Status(Codeforces):', external_status, file=sys.stderr)

        return SubmissionStatus.Unknown

    def _get(self, since: Optional[datetime] = None) -> list[Submission]:
        url = 'http://codeforces.com/api/problemset.recentStatus'

        result: list[Submission] = []

        submissions_json = self._request(f'{url}?count=1000')
        submissions = json.loads(submissions_json)['result']

        # 古い順
        for submission in reversed(submissions):

            user_id = submission['author']['members'][0]['handle']
            contest_id = str(submission['problem']['contestId'])
            task_id = submission['problem']['index']
            submission_id = int(submission['id'])
            timestamp = int(submission['creationTimeSeconds'])
            status = submission['verdict'] if 'verdict' in submission else ''
            score = 1 if self._normalize_status(
                status) == SubmissionStatus.Accepted else 0
            language = submission['programmingLanguage']
            memory = submission['memoryConsumedBytes']
            exec_time = submission['timeConsumedMillis']
            code_size = 0

            data = Submission(
                id=submission_id,
                external_user_id=user_id,
                external_contest_id=f'codeforces:{contest_id}',
                score=score,
                status=self._normalize_status(status),
                language=language,
                external_task_id=f'codeforces:{contest_id}:{task_id}',
                external_submission_id=f'codeforces:{contest_id}:{submission_id}',
                submitted_at=datetime.fromtimestamp(
                    timestamp, tz=timezone.utc),
                memory=memory,
                exec_time=exec_time,
                code_size=code_size
            )

            if data.status == SubmissionStatus.WaitingForJudging:
                break

            if self.latest_id and data.id <= self.latest_id:
                continue

            if since is not None and data.submitted_at < since:
                continue

            result.append(data)

        return result
