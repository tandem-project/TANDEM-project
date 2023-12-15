#!/bin/bash

is_sudo=$(id -u)

if [ $is_sudo -eq 0 ]
then
    echo Root id calling ... $is_sudo
fi
   
FILE_EXISTS=False
if test !RUN_FILE_EXISTS; then
    echo File Does Not
fi
