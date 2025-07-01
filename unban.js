const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('🔓 إلغاء حظر عضو من السيرفر')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('ID العضو المحظور')
                .setRequired(true)),

    async execute(interaction) {
        const userId = interaction.options.getString('userid');
        try {
            await interaction.guild.bans.remove(userId);
            interaction.reply(`✅ تم إلغاء الحظر عن العضو: ${userId}`);
        } catch (err) {
            interaction.reply('❌ لم أتمكن من إلغاء الحظر. تأكد من ID.');
        }
    }
};