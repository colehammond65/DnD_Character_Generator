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
  const min = 3;
  const max = 18;

  character.abilities = {
    strength: Math.floor(Math.random() * (max - min + 1)) + min,
    dexterity: Math.floor(Math.random() * (max - min + 1)) + min,
    constitution: Math.floor(Math.random() * (max - min + 1)) + min,
    intelligence: Math.floor(Math.random() * (max - min + 1)) + min,
    wisdom: Math.floor(Math.random() * (max - min + 1)) + min,
    charisma: Math.floor(Math.random() * (max - min + 1)) + min
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
  character.name = removeNewLine(character.name);
  character.race = removeNewLine(character.race);
  character.class = removeNewLine(character.class);
  character.alignment = removeNewLine(character.alignment);

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
  past = removeNewLine(past);
  definingMoment = removeNewLine(definingMoment);
  goal = removeNewLine(goal);

  // Add the past event, defining moment, and goal to the character's backstory
  character.backstory += `${character.name} ${past}. One defining moment in their past was when they ${definingMoment}. Currently, ${character.name} is ${goal}.`;

// Return the character
  return character;
}

// Function to remove new line characters from a string
  function removeNewLine(str) {
  return str.replace(/\r?\n|\r/g, " ");
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
		.setDescription(`${character.name} is a ${character.alignment} character with the following abilities:`)
    .addFields(
      { name: 'Strength', value: character.abilities.strength.toString() },
      { name: 'Dexterity', value: character.abilities.dexterity.toString() },
      { name: 'Constitution', value: character.abilities.constitution.toString() },
      { name: 'Intelligence', value: character.abilities.intelligence.toString() },
      { name: 'Wisdom', value: character.abilities.wisdom.toString() },
      { name: 'Charisma', value: character.abilities.charisma.toString() },
      { name: 'Backstory', value: character.backstory },
    )
		.setColor(0x900000)
		.setFooter({ text: 'Powered by chocy milk' });
	
	// Send the character embed to the channel
	msg.channel.send({ embeds: [characterEmbed] });
	
	}
});

client.login(config.discord_token);
