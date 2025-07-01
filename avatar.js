const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('🖼️ عرض صورة بروفايل عضو')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const embed = new EmbedBuilder()
            .setTitle(`🖼️ صورة ${user.username}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('Blue');

        interaction.reply({ embeds: [embed] });
    }
};