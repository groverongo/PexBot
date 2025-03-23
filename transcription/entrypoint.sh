#!/bin/bash --login
# The --login ensures the bash configuration is loaded,

if [ -z "${CONDA_ENV_NAME}" ]; then
    echo "CONDA_ENV_NAME environment variable is not set."
    exit 1
fi

# Temporarily disable strict mode and activate conda:
set +euo pipefail
conda activate "${CONDA_ENV_NAME}"
# enable strict mode:
set -euo pipefail

# exec the final command:
exec make start