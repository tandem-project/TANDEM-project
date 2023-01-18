#!/bin/bash

# Underline character = \e[4m
# Red characters = \e[31m

# Use NFSTAT to list NFS Mount Points
echo -e '\e[4m\e[31mUse NFSSTAT to list nfs mount points\e[0m' 
nfsstat --mount

# Use /PROC/MOUNTS to list NFS Mount Points
echo -e '\e[4m\e[33mUse /PROC/MOUNTS to list mount points on nfs-client\e[0m'
cat /proc/mounts | grep nfs
