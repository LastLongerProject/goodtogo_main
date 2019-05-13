#!/bin/bash
rsync -ravze 'ssh -i ~/.ssh/GoodToGo.pem' build/* ubuntu@master.goodtogo.tw:~/MainPage