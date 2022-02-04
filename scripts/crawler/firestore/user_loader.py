from .loader import FireStoreLoader


class UsersLoader(FireStoreLoader):
    def sync(self):
        isFirst = self.latest_timestamp is None

        if isFirst:
            query = self.db.collection('users')
        else:
            query = self.db.collection('users').where(
                'updatedAt', '>', self.latest_timestamp
            )

        docs = query.stream()
        datalist = [
            {'id': doc.id, **doc.to_dict()} for doc in docs
        ]

        self.data.extend(datalist)

        self._update_latest_timestamp(self.data)

        # TODO: unique filter
