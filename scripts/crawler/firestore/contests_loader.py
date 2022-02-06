from .loader import FireStoreLoader
from datetime import datetime, timezone


class ContestsLoader(FireStoreLoader):
    def sync(self):
        isFirst = self.latest_timestamp is None

        if isFirst:
            query = self.db.collection('contests').where(
                'endAt', '>', datetime.now(tz=timezone.utc)
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

        now_microseconds = self.to_microseconds(datetime.now())

        # TODO: unique filter

        delete_data = list(filter(
            lambda x: self.to_microseconds(x['endAt']) <= now_microseconds,
            self.get_data()
        ))
        for item in delete_data:
            self._del_data(item['id'])
