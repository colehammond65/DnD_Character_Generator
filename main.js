const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const config = require("./config.json");

//#region DJS Setup
const client = new Client({
	intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent ], 
	partials: [ Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction ] 
});

// This event handler is called when the client is ready
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// Generate a random DnD character
function generateCharacter() {
	// Create an empty character object
	const character = {};
	
	// Generate random abilities
	character.abilities = {
	strength: Math.floor(Math.random() * 20) + 1,
	dexterity: Math.floor(Math.random() * 20) + 1,
	constitution: Math.floor(Math.random() * 20) + 1,
	intelligence: Math.floor(Math.random() * 20) + 1,
	wisdom: Math.floor(Math.random() * 20) + 1,
	charisma: Math.floor(Math.random() * 20) + 1
	};
	
	// Read the names, races, classes, and alignments from their respective files
	const names = fs.readFileSync('names.txt', 'utf8').split('\n');
	const races = fs.readFileSync('races.txt', 'utf8').split('\n');
	const classes = fs.readFileSync('classes.txt', 'utf8').split('\n');
	const alignments = fs.readFileSync('alignments.txt', 'utf8').split('\n');
	
	// Generate a random name, race, class, and alignment
	character.name = names[Math.floor(Math.random() * names.length)];
	character.race = races[Math.floor(Math.random() * races.length)];
	character.class = classes[Math.floor(Math.random() * classes.length)];
	character.alignment = alignments[Math.floor(Math.random() * alignments.length)];

	// remove new line from name, race, class, and alignment
	character.name = character.name.replace(/\r?\n|\r/g, " ");
	character.race = character.race.replace(/\r?\n|\r/g, " ");
	character.class = character.class.replace(/\r?\n|\r/g, " ");
	character.alignment = character.alignment.replace(/\r?\n|\r/g, " ");
	
	// Generate character's backstory
	character.backstory = "";
	
	// Read the past events, defining moments, and goals from their respective files
	const pastEvents = fs.readFileSync('pastEvents.txt', 'utf8').split('\n');
	const definingMoments = fs.readFileSync('definingMoments.txt', 'utf8').split('\n');
	const goals = fs.readFileSync('goals.txt', 'utf8').split('\n');
	
	// Generate a random past event, defining moment, and goal
	var past = pastEvents[Math.floor(Math.random() * pastEvents.length)];
	var definingMoment = definingMoments[Math.floor(Math.random() * definingMoments.length)];
	var goal = goals[Math.floor(Math.random() * goals.length)];

	// remove new line from name, race, class, and alignment
	past = past.replace(/\r?\n|\r/g, " ");
	definingMoment = definingMoment.replace(/\r?\n|\r/g, " ");
	goal= goal.replace(/\r?\n|\r/g, " ");
	
	// Add the past event, defining moment, and goal to the character's backstory
	character.backstory += `${character.name} ${past}. One defining moment in their past was when they ${definingMoment}. Currently, ${character.name} is ${goal}.`;
	
	// Return the character
	return character;
}

// This event handler is called when the client receives a message
client.on("messageCreate", function(msg) {
	// If the message is "!dndchar"
	if (msg.content === '!dndchar') {
	// Generate a random character and send it to the channel
	const character = generateCharacter();
	
	// Create the character embed with the generated character's information
	const characterEmbed = new EmbedBuilder()
	  .setTitle(`${character.name} the ${character.race} ${character.class}`)
	  .setDescription(`${character.name} is a ${character.alignment} character with the following abilities:
	
		- Strength: ${character.abilities.strength}
		- Dexterity: ${character.abilities.dexterity}
		- Constitution: ${character.abilities.constitution}
		- Intelligence: ${character.abilities.intelligence}
		- Wisdom: ${character.abilities.wisdom}
		- Charisma: ${character.abilities.charisma}
	
	  ${character.backstory}`)
	  .setColor(0x00AE86)
	  .setFooter({ text: 'Powered by chocy milk' });
	
	// Send the character embed to the channel
	msg.channel.send({ embeds: [characterEmbed] });
	
	}
});

client.login(config.discord_token);