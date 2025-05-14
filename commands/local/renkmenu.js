const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

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
        .setDescription('Rəng menyusunu göstərir.'),
    async execute(interaction) {
        console.log('Komut çalıştırılıyor: renkmenu'); // Debug mesajı
        try {
            const embed = new EmbedBuilder()
                .setTitle('🎨 Rəng Menyusu')
                .setDescription('Aşağıdakı düymələrə basaraq istədiyiniz rəngi seçə bilərsiniz:')
                .setColor('#ffffff');

            console.log('Embed başarıyla oluşturuldu.'); // Debug mesajı

            const row = new ActionRowBuilder();
            colors.forEach(color => {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(color.id)
                        .setLabel(color.name)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🎨')
                );
            });

            console.log('Butonlar başarıyla oluşturuldu.'); // Debug mesajı

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });

            console.log('Interaction başarıyla yanıtlandı.'); // Debug mesajı
        } catch (error) {
            console.error('Hata meydana geldi:', error); // Hatanın detayını yazdır
            await interaction.reply({
                content: '❌ Rəng menyusu yüklənərkən xəta baş verdi.',
                ephemeral: true
            });
        }
    },
};