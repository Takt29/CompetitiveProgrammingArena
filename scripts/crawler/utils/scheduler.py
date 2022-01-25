import time
import threading


def scheduler(fn, interval_sec, min_wait_sec=0):
    while True:
        start_time = time.time()

        t = threading.Thread(target=fn)
        t.start()
        t.join()

        wait_sec = max(
            interval_sec - (time.time() - start_time),
            min_wait_sec
        )

        if wait_sec > 0:
            time.sleep(wait_sec)
