from abc import ABC, abstractmethod
from datetime import datetime
from enum import Enum, unique
from typing import Optional, TypedDict
from urllib.request import urlopen


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


SubmissionType = TypedDict('SubmissionType', {
    'id': int,
    'external_user_id': str,
    'external_contest_id': str,
    'score': int,
    'status': SubmissionStatus,
    'external_task_id': str,
    'external_submission_id': str,
    'submitted_at': datetime,
})


class SubmissionLoader(ABC):
    latest_id: Optional[int]
    external_contest_id: str

    def __init__(self, external_contest_id: str):
        self.latest_id = None
        self.external_contest_id = external_contest_id

    def reset(self):
        self.latest_id = None

    def _request(self, url: str):
        return urlopen(url, timeout=10).read().decode('utf-8')

    @abstractmethod
    def _normalize_status(self, external_status: str) -> SubmissionStatus:
        pass

    @abstractmethod
    def get(self, since: Optional[datetime]) -> list[SubmissionType]:
        pass
