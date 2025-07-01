const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

const warns = new Map(); // تخزين التحذيرات مؤقتًا (يفضل قاعدة بيانات لاحقًا)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('⚠️ إرسال تحذير لعضو')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('سبب التحذير')
                .setRequired(false)),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
            return interaction.reply({ content: '❌ لا تملك صلاحية.', ephemeral: true });

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'بدون سبب';

        const current = warns.get(user.id) || [];
        current.push({ reason, date: new Date().toLocaleString() });
        warns.set(user.id, current);

        interaction.reply(`⚠️ تم تحذير ${user.tag} | السبب: ${reason}`);
    }
};