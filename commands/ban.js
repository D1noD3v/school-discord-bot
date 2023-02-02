const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

// Gör ett ban kommando
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers)
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for banning'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
	async execute(interaction) {
		// 'Target' i detta fall är användaren vi vill banna.
		const target = interaction.options.getUser('target');
		// * Visar anledning till ban, om ingen anledning = No reason provided.
		const reason = interaction.options.getString('reason') ?? 'No reason provided.';

		await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
		await interaction.guild.members.ban(target);
	},
};
