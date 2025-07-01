const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('🎭 إعطاء أو إزالة رتبة من عضو')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('الرتبة')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('action')
                .setDescription('إعطاء أو إزالة؟')
                .addChoices(
                    { name: 'إعطاء', value: 'add' },
                    { name: 'إزالة', value: 'remove' }
                )
                .setRequired(true)),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles))
            return interaction.reply({ content: '❌ لا تملك صلاحية.', ephemeral: true });

        const member = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');
        const action = interaction.options.getString('action');

        if (action === 'add') {
            await member.roles.add(role);
            interaction.reply(`✅ تم إعطاء ${role.name} لـ ${member.user.username}`);
        } else {
            await member.roles.remove(role);
            interaction.reply(`✅ تم إزالة ${role.name} من ${member.user.username}`);
        }
    }
};