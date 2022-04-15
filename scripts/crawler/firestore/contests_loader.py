from .loader import FireStoreLoader
from datetime import datetime, timedelta, timezone


class ContestsLoader(FireStoreLoader):
    def sync(self):
        isFirst = self.latest_timestamp is None

        end_at_threshold = datetime.now(
            tz=timezone.utc) - timedelta(minutes=10)

        if isFirst:
            query = self.db.collection('contests').where(
                'endAt', '>', end_at_threshold
            )
        else:
            query = self.db.collection('contests').where(
                'updatedAt', '>', self.latest_timestamp
            )

        docs = query.stream()
        datalist = [
            {'id': doc.id, **doc.to_dict()} for doc in docs
        ]

        for item in datalist:
            self._add_data(item)

        # TODO: unique filter

        delete_data = list(filter(
            lambda x: not (self.to_microseconds(
                x['endAt']) > self.to_microseconds(end_at_threshold)),
            self.get_data()
        ))
        for item in delete_data:
            self._del_data(item['id'])
