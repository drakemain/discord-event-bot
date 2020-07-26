#!/bin/bash

npm i
npm run build

sudo rm -r /var/www/discord-event-bot
sudo mkdir /var/www/discord-event-bot
sudo cp -r dist/ /var/www/discord-event-bot/
sudo cp -r node_modules /var/www/discord-event-bot/

sudo chown -R discord-event-bot /var/www/discord-event-bot
