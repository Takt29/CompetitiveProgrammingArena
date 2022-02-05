import sys
from abc import ABC, abstractmethod
from datetime import datetime
from enum import Enum, unique
from typing import Optional
from urllib.request import urlopen
from dataclasses import dataclass
import traceback


@unique
class SubmissionStatus(Enum):
    CompileError = 'CE'
    WrongAnswer = 'WA'
    TimeLimitExceeded = 'TLE'
    MemoryLimitExceeded = 'MLE'
    Accepted = 'AC'
    OutputLimitExceeded = 'OLE'
    RuntimeError = 'RE'
    PresentationError = 'PE'
    InternalError = 'IE'
    WaitingForJudging = 'WJ'
    Unknown = 'Unknown'


@dataclass
class Submission:
    id: int
    external_user_id: str
    external_contest_id: str
    score: int
    status: SubmissionStatus
    language: str
    external_task_id: str
    external_submission_id: str
    submitted_at: datetime


class SubmissionLoader(ABC):
    latest_id: Optional[int]
    external_contest_id: str

    def __init__(self, external_contest_id: str):
        self.latest_id = None
        self.external_contest_id = external_contest_id

    def reset(self):
        self.latest_id = None

    def _request(self, url: str):
        print('request:', url, file=sys.stderr, flush=True)
        return urlopen(url, timeout=10).read().decode('utf-8')

    @abstractmethod
    def _normalize_status(self, external_status: str) -> SubmissionStatus:
        pass

    @abstractmethod
    def _get(self, since: Optional[datetime]) -> list[Submission]:
        pass

    def get(self, since: Optional[datetime]) -> list[Submission]:
        try:
            submissions = self._get(since)

            for submission in submissions:
                if self.latest_id is None or self.latest_id < submission.id:
                    self.latest_id = submission.id

        except Exception as e:
            print(traceback.format_exc(), file=sys.stderr, flush=True)
            return []

        return submissions
