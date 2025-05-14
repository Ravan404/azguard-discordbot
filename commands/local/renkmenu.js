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

            // İlk satır (0-4 arası butonlar - ilk 5 buton)
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

            // İkinci satır (4-8 arası butonlar - sonraki 4 buton)
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

            console.log('Butonlar başarıyla oluşturuldu.'); // Debug mesajı

            await interaction.reply({
                embeds: [embed],
                components: [firstRow, secondRow], // İki satır olarak gönder
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