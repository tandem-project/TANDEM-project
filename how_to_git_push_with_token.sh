#!/bin/bash

# Contributor --> mvimplis2013
# Project:
#  username = TANDEM-projct
#  repository = tandem-project

# Generate an Authentication token
# MVIMPLIS2013 --> Settings --> Developes Adv --> Auth Token
#   SOS ... Select Scope : Repo

git remote rm origin
git remote add origin https://tandem-project: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@github.com/tandem-project/TANDEM-project.git

git add .
git commit -m ""

git push --set-upstream origin Master
