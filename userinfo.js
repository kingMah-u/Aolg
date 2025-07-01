const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('👤 معلومات عن عضو')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('اختر العضو')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setTitle(`👤 معلومات ${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'الاسم الكامل', value: user.tag, inline: true },
                { name: 'تاريخ الإنشاء', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: 'الانضمام للسيرفر', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: false }
            )
            .setColor("Blue");

        interaction.reply({ embeds: [embed] });
    }
};