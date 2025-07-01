const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('🔒 قفل القناة الحالية'),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
            return interaction.reply({ content: 'ليس لديك صلاحية لإدارة القنوات.', ephemeral: true });

        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
        interaction.reply('✅ تم قفل القناة.');
    }
};