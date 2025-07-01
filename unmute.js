const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('🔊 إلغاء كتم عضو')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('اختر العضو')
                .setRequired(true)),

    async execute(interaction) {
        const member = interaction.options.getMember('user');
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
            return interaction.reply({ content: 'ليس لديك صلاحية.', ephemeral: true });

        await member.timeout(null);
        interaction.reply(`✅ تم إلغاء الكتم عن ${member.user.username}.`);
    }
};