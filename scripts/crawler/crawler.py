#! /usr/bin/env python3

import sys
import io
from os.path import join, dirname
from dotenv import load_dotenv
from utils import scheduler

# set default encoding
# ---------------------------------
sys.stdin = io.TextIOWrapper(sys.stdin.buffer,  encoding='utf-8')
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# loading env
# ---------------------------------
dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)


def update_submissions():
    print('update_submissions', flush=True)


def main():
    try:
        update_submissions()
    except Exception as e:
        print(e, file=sys.stderr)


if __name__ == '__main__':
    scheduler.scheduler(main, 15, 5)
