#!/bin/bash --login
# The --login ensures the bash configuration is loaded,

# Temporarily disable strict mode and activate conda:
set +euo pipefail
conda activate PexBot-api
# enable strict mode:
set -euo pipefail

# exec the final command:
exec make start