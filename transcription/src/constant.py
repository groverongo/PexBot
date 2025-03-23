from os import getcwd, path, getenv

TMP_DIR = getenv("TMP_DIR", path.join(getcwd(), "..", "temp"))
