from os import getcwd, path, getenv
from tempfile import gettempdir

DEVELOPMENT = getenv("ENVIRONMENT", "development")

TMP_DIR = gettempdir() if  DEVELOPMENT != "development" else path.join(getcwd(), "temp")