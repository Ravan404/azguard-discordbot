const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun gecikmə müddətini yoxlayır'),
  async execute(interaction) {
    // Botun gecikmə müddətini hesablayırıq
    const sent = await interaction.reply({ content: 'Ping hesablanır...', fetchReply: true });
    const ping = sent.createdTimestamp - interaction.createdTimestamp;
    
    await interaction.editReply(`Bot gecikməsi: ${ping}ms\nAPI gecikməsi: ${interaction.client.ws.ping}ms`);
  },
};