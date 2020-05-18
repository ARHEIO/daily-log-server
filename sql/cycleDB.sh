#!/bin/bash

mysql -h0.0.0.0 -uroot -proot selfcare < ${PWD}/sql/selfcare-backup-dev.sql
