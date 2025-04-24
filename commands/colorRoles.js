// commands/renkroller.js
const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('renkroller')
        .setDescription('Renk rolü seçme menüsünü oluşturur')
        .setDefaultMemberPermissions(0x8), // Sadece yönetici yetkisi olanlar kullanabilir

    async execute(interaction) {
        // Embed oluştur
        const embed = new EmbedBuilder()
            .setTitle('🎨 Renk Rolleri')
            .setDescription('Aşağıdaki butonlara tıklayarak renk rolü alabilirsiniz.')
            .setColor('#ff0000');

        // Butonları oluştur
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('kirmizi')
                    .setLabel('Kırmızı')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('mavi')
                    .setLabel('Mavi')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('yesil')
                    .setLabel('Yeşil')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('mor')
                    .setLabel('Mor')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({ embeds: [embed], components: [buttons] });
    },
};