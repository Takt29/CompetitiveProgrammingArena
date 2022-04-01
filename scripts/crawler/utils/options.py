import argparse


class Options():
    parser: argparse.ArgumentParser
    initialized: bool

    def __init__(self) -> None:
        self.parser = argparse.ArgumentParser()
        self.initialized = False

    def initialize(self):
        self.parser.add_argument(
            '--emulator',
            action='store_true',
            default=False,
            help='connect to emulator'
        )

        self.initialized = True

    def parse(self):
        if self.initialized == False:
            self.initialize()

        return self.parser.parse_args()
