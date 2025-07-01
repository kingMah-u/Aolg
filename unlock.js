const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('🔓 فتح القناة الحالية'),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
            return interaction.reply({ content: '❌ ليس لديك صلاحية لإدارة القنوات.', ephemeral: true });

        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
        interaction.reply('✅ تم فتح القناة.');
    }
};