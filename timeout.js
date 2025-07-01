const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('⏱️ توقيف عضو مؤقتًا')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('minutes')
                .setDescription('المدة بالدقائق')
                .setRequired(true)),

    async execute(interaction) {
        const member = interaction.options.getMember('user');
        const minutes = interaction.options.getInteger('minutes');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
            return interaction.reply({ content: '❌ لا تملك صلاحية.', ephemeral: true });

        if (minutes < 1 || minutes > 43200)
            return interaction.reply({ content: '❌ يجب أن تكون المدة بين 1 و 43200 دقيقة (30 يوم).', ephemeral: true });

        await member.timeout(minutes * 60 * 1000);
        interaction.reply(`✅ تم توقيف ${member.user.username} لمدة ${minutes} دقيقة.`);
    }
};