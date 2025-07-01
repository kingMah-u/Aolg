const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('📊 معلومات عن السيرفر'),

    async execute(interaction) {
        const { guild } = interaction;

        const embed = new EmbedBuilder()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'المالك', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'الأعضاء', value: `${guild.memberCount}`, inline: true },
                { name: 'الرومات', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'الرولات', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'ID', value: `${guild.id}`, inline: false }
            )
            .setColor('Gold');

        interaction.reply({ embeds: [embed] });
    }
};