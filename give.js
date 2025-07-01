const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './currency.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give')
        .setDescription('🤝 إرسال عملة king 👑 لعضو آخر')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو المستلم')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('عدد العملات')
                .setRequired(true)),

    async execute(interaction) {
        const sender = interaction.user;
        const receiver = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        if (receiver.id === sender.id)
            return interaction.reply({ content: '❌ لا يمكنك إرسال العملة لنفسك.', ephemeral: true });

        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        data[sender.id] = data[sender.id] || 0;
        data[receiver.id] = data[receiver.id] || 0;

        if (data[sender.id] < amount)
            return interaction.reply({ content: '❌ لا تملك رصيد كافٍ.', ephemeral: true });

        data[sender.id] -= amount;
        data[receiver.id] += amount;

        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        interaction.reply(`✅ تم إرسال ${amount} 👑 من ${sender.username} إلى ${receiver.username}`);
    }
};