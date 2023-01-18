#!/bin/bash

is_sudo=$(id -u)

if [ $is_sudo -eq 0 ]
then
    echo Root id calling ... $is_sudo
fi
   
