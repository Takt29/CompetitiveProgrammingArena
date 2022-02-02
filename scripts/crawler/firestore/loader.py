from abc import ABC, abstractmethod
from .firestore import connect


class FireStoreLoader(ABC):
    def __init__(self):
        self.latest_timestamp = None
        self.db = connect()
        self.data = []
        pass

    def _update_latest_timestamp(self, data):
        if len(data) > 0:
            if self.latest_timestamp is None:
                self.latest_timestamp = data[0]['updatedAt']

            for item in data:
                if self.latest_timestamp is None or \
                        self.to_microseconds(self.latest_timestamp) < self.to_microseconds(item['updatedAt']):
                    self.latest_timestamp = item['updatedAt']

    @staticmethod
    def to_microseconds(datetime_with_nanoseconds):
        seconds = int(datetime_with_nanoseconds.timestamp())
        microseconds = datetime_with_nanoseconds.microsecond

        return seconds * 1000 * 1000 + microseconds

    @abstractmethod
    def sync(self):
        pass

    def get_data(self):
        return self.data
