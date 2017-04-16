#!/bin/sh

#deploy master server
cd /home/jonas/MassClickOrchestra
git pull
npm install -y
forever restartall
