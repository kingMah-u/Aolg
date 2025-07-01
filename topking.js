const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './currency.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('topking')
        .setDescription('🏆 عرض أعلى الأعضاء امتلاكًا لعملة king 👑'),

    async execute(interaction) {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        const sorted = Object.entries(data)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const leaderboard = await Promise.all(sorted.map(async ([id, amount], i) => {
            const user = await interaction.client.users.fetch(id);
            return `#${i + 1} - ${user.username}: ${amount} 👑`;
        }));

        interaction.reply(`🏆 **أفضل 10 أعضاء:**
` + leaderboard.join('\n'));
    }
};