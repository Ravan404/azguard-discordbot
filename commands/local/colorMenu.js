const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rengmenu')
        .setDescription('Rəng seçmə menyusunu göndərir')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        let rengRollari;
        try {
            rengRollari = JSON.parse(fs.readFileSync('./colorRoles.json', 'utf8'));
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

        const buttons = new ActionRowBuilder();

        if (rengRollari.qirmizi) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('sema mavisi')
                    .setLabel('Səma Mavisi')
                    .setStyle(ButtonStyle.Danger)
            );
        }
        if (rengRollari.mavi) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('aciq cehrayi')
                    .setLabel('Açıq Çəhrayı')
                    .setStyle(ButtonStyle.Primary)
            );
        }
        if (rengRollari.yasil) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('nane yasili')
                    .setLabel('Nanə Yaşılı')
                    .setStyle(ButtonStyle.Success)
            );
        }
        if (rengRollari.benovsky) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('lavanda')
                    .setLabel('Lavanda')
                    .setStyle(ButtonStyle.Secondary)
            );
        }
        if (rengRollari.benovsky) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('saftali')
                    .setLabel('Şaftalı')
                    .setStyle(ButtonStyle.Secondary)
            );
        }
        if (rengRollari.qirmizi) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('qizilgul')
                    .setLabel('Qızılgül')
                    .setStyle(ButtonStyle.Danger)
            );
        }
        if (rengRollari.mavi) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('limon sarisi')
                    .setLabel('Limon Sarısı')
                    .setStyle(ButtonStyle.Primary)
            );
        }
        if (rengRollari.yasil) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('deniz yasili')
                    .setLabel('Dəniz Yaşılı')
                    .setStyle(ButtonStyle.Success)
            );
        }
        if (rengRollari.benovsky) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('bulud agi')
                    .setLabel('Bulud Ağı')
                    .setStyle(ButtonStyle.Secondary)
            );
        }
        if (rengRollari.benovsky) {
            buttons.addComponents(
                new ButtonBuilder()
                    .setCustomId('gunebatan narincisi')
                    .setLabel('Günbatan Narıncısı')
                    .setStyle(ButtonStyle.Secondary)
            );
        }

        await interaction.reply({ embeds: [embed], components: [buttons] });
    },
};