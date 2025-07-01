const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = './autoline.json';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autoline')
    .setDescription('📝 ربط كلمة بصورة أو GIF')
    .addStringOption(option =>
      option.setName('keyword')
        .setDescription('الكلمة التي تريد ربطها')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('link')
        .setDescription('رابط الصورة أو الـ GIF')
        .setRequired(true)),

  async execute(interaction) {
    const keyword = interaction.options.getString('keyword').toLowerCase();
    const link = interaction.options.getString('link');

    let data = {};
    if (fs.existsSync(path)) {
      data = JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    data[keyword] = link;

    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    interaction.reply(`✅ تم ربط الكلمة **${keyword}** بالرابط بنجاح!`);
  }
};
