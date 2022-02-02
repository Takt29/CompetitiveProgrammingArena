from firebase_admin import credentials, initialize_app, firestore
from os.path import join, dirname


def init():
    initialize_app(
        credentials.Certificate(
            join(dirname(__file__), '../../serviceAccountKey.json')
        )
    )


def connect():
    return firestore.client()
