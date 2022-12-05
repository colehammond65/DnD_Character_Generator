const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');

//#region DJS Setup
const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent ], 
    partials: [ Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction ] 
});

// Generate a random DnD character
function generateCharacter() {
    // Create an empty character object
    let character = {};
  
    // Generate random abilities
    character.abilities = {
      strength: Math.floor(Math.random() * 20) + 1,
      dexterity: Math.floor(Math.random() * 20) + 1,
      constitution: Math.floor(Math.random() * 20) + 1,
      intelligence: Math.floor(Math.random() * 20) + 1,
      wisdom: Math.floor(Math.random() * 20) + 1,
      charisma: Math.floor(Math.random() * 20) + 1
    };
    
    // Generate a random name
    const names = ['Aric the Wise', 'Eliza the Brave', 'Thorne the Mighty', 'Aria the Wise', 'Sylas the Swift', 'Rowan the Wise', 'Zara the Strong', 'Leo the Wise', 'Nara the Clever', 'Orion the Wise', 'Ariana Shadowdancer', 'Marcus Stormblade', 'Elara Moonfire', 'Zander Nightfang', 'Thalia Dreamweaver', 'Lirien Silverleaf', 'Kaela Starfall', 'Niklas Wolfheart', 'Evangeline Moonwhisper', 'Rowan Stormbringer', 'Aric Ironhand', 'Tauriel Nightshade', 'Zephyr Stormbringer', 'Elora Moonflower', 'Kieran Ravenwood', 'Finn Blackwood', 'Maren Moonstone', 'Orin Shadowdancer', 'Gwen Skyfire', 'Darian Stormcaller'];
    character.name = names[Math.floor(Math.random() * names.length)];
    // Generate a random race
    const races = ['Human', 'Dwarf', 'Elf', 'Halfling', 'Dragonborn', 'Gnome', 'Half-elf', 'Half-orc', 'Tiefling'];
    character.race = races[Math.floor(Math.random() * races.length)];
  
    // Generate a random class
    const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
    character.class = classes[Math.floor(Math.random() * classes.length)];
  
    // Generate a random alignment
    const alignments = ['lawful good', 'neutral good', 'chaotic good', 'lawful neutral', 'neutral', 'chaotic neutral', 'lawful evil', 'neutral evil', 'chaotic evil'];
    character.alignment = alignments[Math.floor(Math.random() * alignments.length)];

    // Generate character's backstory
    character.backstory = "";
    let pastEvents = ["grew up in a small village", "trained as a soldier in a great army", "spent time as a member of a thieves' guild", "traveled the world as a merchant", "studied at a prestigious magic academy"];
    let past = pastEvents[Math.floor(Math.random() * pastEvents.length)];
    character.backstory += `${character.name} ${past}. `;

    let definingMoments = ["was forced to flee their home due to a great war", "saved a village from a dragon attack", "made a deal with a powerful demon", "discovered a hidden talent for magic", "was betrayed by their closest friend"];
    let definingMoment = definingMoments[Math.floor(Math.random() * definingMoments.length)];
    character.backstory +=`One defining moment in their past was when they ${definingMoment}. `;

    let goals = ["seeking revenge against those who wronged them", "on a quest to uncover an ancient treasure", "trying to redeem themselves for past mistakes", "hoping to find acceptance in a new group or community", "working to uncover a dark secret about their past"];
    let goal = goals[Math.floor(Math.random() * goals.length)];
    character.backstory += `Currently, ${character.name} is ${goal}.`;
  
    // Return the character
    return character;
}

// This event handler is called when the client is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// This event handler is called when the client receives a message
client.on("messageCreate", function(msg) {
  // If the message is "!dndchar"
  if (msg.content === '!dndchar') {
    // Generate a random character and send it to the channel
    const character = generateCharacter();
    const characterEmbed = new EmbedBuilder()
      .setTitle(`${character.name} the ${character.race} ${character.class}`)
      .setDescription(`${character.name} is a ${character.alignment} character with the following abilities:
        Strength: ${character.abilities.strength}
        Dexterity: ${character.abilities.dexterity}
        Constitution: ${character.abilities.constitution}
        Intelligence: ${character.abilities.intelligence}
        Wisdom: ${character.abilities.wisdom}
        Charisma: ${character.abilities.charisma}

        ${character.backstory}`)
      .setColor(0x00AE86)
      .setFooter({ text: 'Powered by chocy milk' })
      msg.channel.send({ embeds: [characterEmbed] });

  }
});

client.login('MTA0ODgzMDE0Nzk0NTU3MDM5Ng.GoCkW0.uEuPWDNUa80jLPClkqdgasQVGmjhXBhDl9C678');