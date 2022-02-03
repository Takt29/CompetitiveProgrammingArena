from abc import ABC, abstractmethod
from datetime import datetime
from enum import Enum, unique
from typing import Optional, TypedDict

SubmissionType = TypedDict('SubmissionType', {
    'id': int,
    'external_user_id': str,
    'external_contest_id': str,
    'score': int,
    'status': str,
    'external_task_id': str,
    'external_submission_id': str,
    'submitted_at': datetime,
})


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


class SubmissionLoader(ABC):
    latest_id: Optional[int]
    external_contest_id: str

    def __init__(self, external_contest_id: str):
        self.latest_id = None
        self.external_contest_id = external_contest_id

    def reset(self):
        self.latest_id = None

    @abstractmethod
    def _normalize_status(self, external_status: str) -> str:
        pass

    @abstractmethod
    def get(self, since: Optional[datetime]) -> list[SubmissionType]:
        pass
