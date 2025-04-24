const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rengmenu')
        .setDescription('Rəng seçmə menyusunu göndərir')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        // Rəng rollarını oxuyuruq
        let rengRollari;
        try {
            rengRollari = JSON.parse(fs.readFileSync('./rengroller.json', 'utf8'));
        } catch {
            return interaction.reply({
                content: '❌ Hələ heç bir rəng rolu təyin edilməyib! /rengayarla istifadə edin.',
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setTitle('🎨 Rəng Rolları')
            .setDescription('Aşağıdakı düymələrə basaraq rəng seçə bilərsiniz.')
            .setColor('#ff0000');

        // Təyin edilmiş rənglər üçün düymələr yaradırıq
        const buttons = new ActionRowBuilder();

        if (rengRollari.qirmizi) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('qirmizi')
                    .setLabel('Qırmızı')
                    .setStyle(ButtonStyle.Danger)
            );
        }
        if (rengRollari.mavi) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('mavi')
                    .setLabel('Mavi')
                    .setStyle(ButtonStyle.Primary)
            );
        }
        if (rengRollari.yasil) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('yasil')
                    .setLabel('Yaşıl')
                    .setStyle(ButtonStyle.Success)
            );
        }
        if (rengRollari.benovsky) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('benovsky')
                    .setLabel('Bənövşəyi')
                    .setStyle(ButtonStyle.Secondary)
            );
        }

        await interaction.reply({ embeds: [embed], components: [buttons] });
    },
};