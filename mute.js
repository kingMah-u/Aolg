const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('🔇 كتم عضو')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('اختر العضو')
                .setRequired(true)),

    async execute(interaction) {
        const member = interaction.options.getMember('user');
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
            return interaction.reply({ content: 'ليس لديك صلاحية كتم الأعضاء.', ephemeral: true });

        await member.timeout(10 * 60 * 1000);
        interaction.reply(`✅ تم كتم ${member.user.username} لمدة 10 دقائق.`);
    }
};