const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription('Takes the user to the creators github profile.'),
	async execute(interaction) {
		await interaction.reply('Click [here](https://github.com/D1noD3v) to see the creators github profile.');
	},
};