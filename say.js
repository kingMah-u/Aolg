const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('🗣️ يخلي البوت يكرر كلامك')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('الرسالة')
                .setRequired(true)),

    async execute(interaction) {
        const message = interaction.options.getString('message');
        await interaction.reply({ content: '🗣️ تم إرسال الرسالة!', ephemeral: true });
        interaction.channel.send(message);
    }
};