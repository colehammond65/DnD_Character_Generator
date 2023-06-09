# DnD Character Generator
Discord bot for creating DnD Characters

## About
Discord Bot is a discord bot for streamers

## Installation

### Creating a Discord bot:
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application, the name can be what ever you want
3. Go to the 'Bot' tab and click 'Add Bot'
4. Enable 'PRESENCE INTENT', 'SERVER MEMBERS INTENT' and 'MESSAGE CONTENT INTENT'
5. Click 'Reset Token' and make a note of the token as you can't check it again without reseting it

### Setting up the bot

#### Docker (Recommended)
NOTE: This assumes you already have [docker](https://www.docker.com/) installed and configured
1. Create a directory where you want to run the bot from 
2. Create a config.json file for the bot to use, check the config example file to see the formatting
3. Copy `docker-compose.yml` to your Directory
4. Run `docker-compose up -d`

#### Node
NOTE: This assumes you already have [node](https://nodejs.org/en/) installed and configured
1. Download the Project files and extract them to the directory you want to run the bot form
2. Create a config.json file for the bot to use, check the config example file to see the formatting
3. Open command prompt and change to the directory where you have the bot `cd /d c:\path\to\bot`
4. run `node main.js`

