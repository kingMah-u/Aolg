const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('🧹 مسح عدد من الرسائل')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('عدد الرسائل')
                .setRequired(true)),

    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
            return interaction.reply({ content: '❌ ليس لديك صلاحية مسح الرسائل.', ephemeral: true });

        if (amount < 1 || amount > 100)
            return interaction.reply({ content: '❌ يجب اختيار رقم بين 1 و 100.', ephemeral: true });

        await interaction.channel.bulkDelete(amount, true);
        interaction.reply(`✅ تم مسح ${amount} رسالة.`);
    }
};