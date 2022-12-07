# DnD_Character_Generator
Discord bot for creating DnD Characters

About
Discord Bot is a discord bot for streamers

Installation
Creating a Discord bot:
Go to the Discord Developer Portal
Create a new application, the name can be what ever you want
Go to the 'Bot' tab and click 'Add Bot'
Enable 'PRESENCE INTENT', 'SERVER MEMBERS INTENT' and 'MESSAGE CONTENT INTENT'
Click 'Reset Token' and make a note of the token as you can't check it again without reseting it
Creating a Twitch Application:
Go to the Twitch Developer Console
Click 'Register Your Application'
Give the application what ever name you want
Set 'OAuth Redirect URLs' to 'http://localhost'
Set 'Category' to 'Application Integration' and click 'Create'
Click 'Manage' on the application you created
Make a note of the 'Client ID' and create a New Secret, make a note of this as well
Setting up the bot
Docker (Recommended)
NOTE: This assumes you already have docker installed and configured

Create a directory where you want to run the bot from
Create a config.json file for the bot to use, check the config example file to see the formatting
Copy docker-compose.yml to your Directory
Run docker-compose up -d
Node
NOTE: This assumes you already have node installed and configured

Download the Project files and extract them to the directory you want to run the bot form
Create a config.json file for the bot to use, check the config example file to see the formatting
Open command prompt and change to the directory where you have the bot cd /d c:\path\to\bot
run node main.js
