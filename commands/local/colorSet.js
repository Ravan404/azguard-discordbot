// commands/colorset.js
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rengayarla')
        .setDescription('Rəng və rol təyin etmə sistemi')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addRoleOption(option => 
            option.setName('rol')
                .setDescription('Rəng rolu seçin')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reng')
                .setDescription('Rəng seçin')
                .setRequired(true)
                .addChoices(
                    { name: 'Səma Mavisi', value: 'sema mavisi' },
                    { name: 'Açıq Çəhrayı', value: 'aciq cehrayi' },
                    { name: 'Nanə Yaşılı', value: 'nane yasili' },
                    { name: 'Lavanda', value: 'lavanda' },
                    { name: 'Şaftalı', value: 'saftali' },
                    { name: 'Qızılgül', value: 'qizilgul' },
                    { name: 'Limon Sarısı', value: 'limon sarisi' },
                    { name: 'Dəniz Yaşılı', value: 'deniz yasili' },
                    { name: 'Bulud Ağı', value: 'bulud agi' },
                    { name: 'Günbatan Narıncısı', value: 'gunebatan narincisi' },
                )),

    async execute(interaction) {
        const rol = interaction.options.getRole('rol');
        const reng = interaction.options.getString('reng');

        const fs = require('fs');
        let colorRoles;
        
        try {
            colorRoles = JSON.parse(fs.readFileSync('./colorRoles.json', 'utf8'));
        } catch {
            colorRoles = {};
        }

        colorRoles[reng] = rol.id;

        fs.writeFileSync('./colorRoles.json', JSON.stringify(colorRoles, null, 4));

        await interaction.reply({
            content: `✅ ${rol.name} rolu ${reng} rəngi üçün təyin edildi!`,
            ephemeral: true
        });
    },
};