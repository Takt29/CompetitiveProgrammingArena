from abc import ABC, abstractmethod
from typing import Optional
from .firestore import connect
from datetime import datetime


class FireStoreLoader(ABC):
    latest_timestamp: Optional[datetime]
    db: any
    data: dict[int, any]

    def __init__(self):
        self.latest_timestamp = None
        self.db = connect()
        self.data = dict()
        pass

    def _add_data(self, item, update_latest_timestamp=True):
        self.data[item['id']] = item

        if not update_latest_timestamp:
            return

        if self.latest_timestamp is None or self.to_microseconds(self.latest_timestamp) < self.to_microseconds(item['updatedAt']):
            self.latest_timestamp = item['updatedAt']

    def _del_data(self, key):
        if key in self.data:
            del self.data[key]

    @staticmethod
    def to_microseconds(datetime_with_nanoseconds):
        seconds = int(datetime_with_nanoseconds.timestamp())
        microseconds = datetime_with_nanoseconds.microsecond

        return seconds * 1000 * 1000 + microseconds

    @abstractmethod
    def sync(self):
        pass

    def get_data(self) -> list[any]:
        return list(self.data.values())
