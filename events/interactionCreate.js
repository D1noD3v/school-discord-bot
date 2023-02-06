/* eslint-disable no-empty */
const { Events, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) return;


		if (interaction.commandName === 'button') {
			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('primary')
						.setLabel('Click me!')
						.setStyle(ButtonStyle.Primary),
				);

			await interaction.reply({ content: 'I think you should,', components: [row] });
		}
		else if (interaction.isAutocomplete) {

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.autocomplete(interaction);
			}
			catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		}
	},
};