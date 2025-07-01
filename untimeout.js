const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription('🔓 إزالة التايم أوت من عضو')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو')
                .setRequired(true)),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
            return interaction.reply({ content: '❌ لا تملك صلاحية.', ephemeral: true });

        const member = interaction.options.getMember('user');
        await member.timeout(null);
        interaction.reply(`✅ تم إزالة التايم أوت من ${member.user.username}`);
    }
};