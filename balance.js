const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './currency.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('👛 عرض رصيد king 👑')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('اختر عضو (اختياري)')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        const balance = data[user.id] || 0;
        interaction.reply(`👑 رصيد ${user.username} هو: ${balance} king`);
    }
};