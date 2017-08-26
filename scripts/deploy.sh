#!/bin/sh

#deploy master server
cd /home/jonas/MassClickOrchestra
git pull
docker build -t MassClickOrchestra .
docker run -it --rm --name mco MassClickOrchestra

