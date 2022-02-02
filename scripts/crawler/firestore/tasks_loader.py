from .loader import FireStoreLoader


class TasksLoader(FireStoreLoader):
    def __init__(self, contest_ids=[]):
        super().__init__()
        self.contest_ids = contest_ids

    def add_contest_id(self, contest_id):
        self.contest_ids.append(contest_id)

        query = self.db.collection('tasks').where(
            'contestId', '==', contest_id
        )

        docs = query.stream()
        self.data.extend([
            {'id': doc.id, **doc.to_dict()} for doc in docs
        ])

    def remove_contest_id(self, contest_id):
        self.contest_ids = list(filter(
            lambda x: x == contest_id
        ))
        self.data = list(filter(
            lambda x: x['contestId'] != contest_id
        ))

    def set_contest_ids(self, contest_ids):
        for current_contest_id in self.contest_ids:
            if current_contest_id not in contest_ids:
                self.remove_contest_id(current_contest_id)

        for new_contest_id in contest_ids:
            if new_contest_id not in self.contest_ids:
                self.add_contest_id(new_contest_id)

    def sync(self):
        isFirst = self.latest_timestamp is None

        if len(self.contest_ids) == 0:
            return

        if isFirst:
            query = self.db.collection('tasks').where(
                'contestId', 'in', self.contest_ids
            )
        else:
            query = self.db.collection('tasks').where(
                'contestId', 'in', self.contest_ids
            ).where(
                'updatedAt', '>', self.latest_timestamp
            )

        docs = query.stream()
        data = [
            {'id': doc.id, **doc.to_dict()} for doc in docs
        ]

        self.data.extend(data)

        self._update_latest_timestamp(self.data)
