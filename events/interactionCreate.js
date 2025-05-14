module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        console.log('interactionCreate tetiklendi.'); // Debug

        // Buton interaction'ı varsa işleme
        if (interaction.isButton()) {
            console.log(`Buton tıklandı: ${interaction.customId}`); // Debug
            
            // Renk butonlarını kontrol etme
            const colorButtons = [
                'sari', 'benovseyi', 'mavi', 'cehrayi', 
                'yasil', 'narinci', 'boz', 'qara'
            ];
            
            if (colorButtons.includes(interaction.customId)) {
                try {
                    const colorNames = {
                        'sari': 'Sarı',
                        'benovseyi': 'Bənövşəyi',
                        'mavi': 'Mavi',
                        'cehrayi': 'Çəhrayı',
                        'yasil': 'Yaşıl',
                        'narinci': 'Narıncı',
                        'boz': 'Boz',
                        'qara': 'Qara'
                    };
                    
                    // Rol işlemleri buraya gelecek
                    // Örnek cevap:
                    await interaction.reply({
                        content: `✅ **${colorNames[interaction.customId]}** rəngi seçildi!`,
                        ephemeral: true
                    });
                } catch (error) {
                    console.error('Renk işleme hatası:', error);
                    await interaction.reply({
                        content: '❌ Rəng seçilirkən xəta baş verdi.',
                        ephemeral: true
                    });
                }
            }
            return; // Buton işleminden sonra çıkıyoruz
        }

        // Slash komutları işleme
        if (!interaction.isChatInputCommand()) {
            console.log('ChatInputCommand (slash komutu) değil.'); // Debug
            return;
        }

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`${interaction.commandName} adında bir komut bulunamadı.`);
            return interaction.reply({ content: 'Komut bulunamadı!', ephemeral: true });
        }

        try {
            console.log(`Komut çalıştırılıyor: ${interaction.commandName}`); // Debug
            await command.execute(interaction);
        } catch (error) {
            console.error('Komut çalıştırılırken bir hata oluştu:', error);
            await interaction.reply({
                content: 'Komut çalıştırılırken bir hatayla karşılaşıldı.',
                ephemeral: true,
            });
        }
    },
};