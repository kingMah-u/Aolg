const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('📤 اكتب رسالة، والبوت يرسلها بدالك ويشيل رسالتك')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('الرسالة التي تريد أن يرسلها البوت')
                .setRequired(true)),

    async execute(interaction) {
        const msg = interaction.options.getString('message');
        await interaction.deferReply({ ephemeral: true });
        await interaction.channel.send(msg);
        await interaction.deleteReply();
    }
};