const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const colors = [
    { name: 'Sarı', id: 'sari', colorCode: '#FFFF00' },
    { name: 'Bənövşəyi', id: 'benovseyi', colorCode: '#800080' },
    { name: 'Mavi', id: 'mavi', colorCode: '#0000FF' },
    { name: 'Çəhrayı', id: 'cehrayi', colorCode: '#FFC0CB' },
    { name: 'Yaşıl', id: 'yasil', colorCode: '#008000' },
    { name: 'Narıncı', id: 'narinci', colorCode: '#FFA500' },
    { name: 'Boz', id: 'boz', colorCode: '#808080' },
    { name: 'Qara', id: 'qara', colorCode: '#000000' }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('renkmenu')
        .setDescription('Rəng menyusunu göstərir.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        try {
            // Önce rolleri oluştur
            for (const color of colors) {
                // Rol var mı diye kontrol et
                let role = interaction.guild.roles.cache.find(r => r.name === color.name);
                
                // Rol yoksa oluştur
                if (!role) {
                    role = await interaction.guild.roles.create({
                        name: color.name,
                        color: color.colorCode,
                        reason: 'Renk rolü oluşturuldu'
                    });
                }
            }

            const embed = new EmbedBuilder()
                .setTitle('🎨 Rəng Menyusu')
                .setDescription('Aşağıdakı düymələrə basaraq istədiyiniz rəngi seçə bilərsiniz:')
                .setColor('#ffffff');

            const firstRow = new ActionRowBuilder();
            for (let i = 0; i < 4; i++) {
                if (i < colors.length) {
                    firstRow.addComponents(
                        new ButtonBuilder()
                            .setCustomId(colors[i].id)
                            .setLabel(colors[i].name)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji('🎨')
                    );
                }
            }

            const secondRow = new ActionRowBuilder();
            for (let i = 4; i < colors.length; i++) {
                secondRow.addComponents(
                    new ButtonBuilder()
                        .setCustomId(colors[i].id)
                        .setLabel(colors[i].name)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🎨')
                );
            }

            await interaction.reply({
                embeds: [embed],
                components: [firstRow, secondRow]
            });

        } catch (error) {
            console.error('Hata meydana geldi:', error);
            await interaction.reply({
                content: '❌ Rəng menyusu yüklənərkən xəta baş verdi.',
                ephemeral: true
            });
        }
    },
};