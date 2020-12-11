#!/bin/bash
rsync -avh --include-from=rsync-files /Users/ssingha/Checkiut/supTryOne/ . --delete # --dry-run
