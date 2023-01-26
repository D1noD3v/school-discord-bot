const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
// Hämta alla Kommandon från kommands filen
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Hämta alla SlashCommandBuilder och parse till json
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Gör en instans av REST
const rest = new REST({ version: '10' }).setToken(token);

// sedan kör alla kommandon
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// fånga fel om det händer
		console.error(error);
	}
})();