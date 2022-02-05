import os
from firebase_admin import credentials, initialize_app, firestore
from os.path import join, dirname

dummy_private_key = """\
-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJAYCGfP/l8oZQzQxckdTgw2w/MzAPioFbSsryUZcVmrGEhe6tPng3V
ONVMkdi7Gha2HFr4XR5RZTvQwWJnIvAFfwIDAQABAkARpJoRp7xT+1sdKRYr3VA6
JEA2AVCKlOS+oRWrR/t8D2333iliOFcF4O0dDE4gXGRKl/MamSJwlhAJ/GykbyDh
AiEAoNV9Oir1cAwqBo+7uZT6ghcpo4jlnWbdGQYXZAuSWIUCIQCZAzq+AhW6xdPR
rBjaFqMK6/zaLkn2nhJseLU0R+XHMwIgGv4ZiUSico6oEvfWgrv9Gw42H8se9j7I
RqXeER1cD10CIQCBipZk3ub+pRVbYdP4b0nBqWD8ZkwAGnuGkfr3NBd4uQIhAIGn
xbLmhvg2B0MSuamSTTk1fe2kAdsY4lxY+pac7Hty
-----END RSA PRIVATE KEY-----"""


def init(emulator=False):
    if emulator == False:
        certificate = credentials.Certificate(
            join(dirname(__file__), '../../serviceAccountKey.json')
        )
    else:
        os.environ['FIRESTORE_EMULATOR_HOST'] = '127.0.0.1:8080'
        os.environ['GCLOUD_PROJECT'] = 'x-local-emu'
        certificate = credentials.Certificate({
            "type": "service_account",
            "project_id": "x-local-emu",
            "private_key_id": "x-local-emu-1",
            "private_key": dummy_private_key,
            "client_email": "local-email@x-local-emu.iam.gserviceaccount.com",
            "client_id": "1234567890",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://accounts.google.com/o/oauth2/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/x-local-emu.iam.gserviceaccount.com"
        })

    initialize_app(certificate)


def connect():
    return firestore.client()
