const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('🚫 حظر عضو من السيرفر')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('اختر العضو')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('سبب الحظر')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'بدون سبب';

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers))
            return interaction.reply({ content: '❌ ليس لديك صلاحية حظر الأعضاء.', ephemeral: true });

        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: '❌ العضو غير موجود في السيرفر.', ephemeral: true });

        await member.ban({ reason });
        interaction.reply(`✅ تم حظر ${user.tag} | السبب: ${reason}`);
    }
};