#!/bin/sh

#deploy master server
cd /home/jonas/MassClickOrchestra
git pull
docker build -t massclickorchestra .
docker run -it --rm --name mco massclickorchestra


