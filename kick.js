const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('👢 طرد عضو من السيرفر')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('اختر العضو')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('سبب الطرد')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'بدون سبب';

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers))
            return interaction.reply({ content: '❌ ليس لديك صلاحية طرد الأعضاء.', ephemeral: true });

        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply({ content: '❌ العضو غير موجود في السيرفر.', ephemeral: true });

        await member.kick(reason);
        interaction.reply(`✅ تم طرد ${user.tag} | السبب: ${reason}`);
    }
};