const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './currency.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeking')
        .setDescription('❌ حذف عملة king 👑 من عضو (لصاحب السيرفر فقط)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('الكمية')
                .setRequired(true)),

    async execute(interaction) {
        if (interaction.user.id !== interaction.guild.ownerId)
            return interaction.reply({ content: '❌ هذا الأمر لصاحب السيرفر فقط.', ephemeral: true });

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        data[user.id] = data[user.id] || 0;
        data[user.id] = Math.max(0, data[user.id] - amount);

        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        interaction.reply(`❌ تم حذف ${amount} 👑 من ${user.username}`);
    }
};