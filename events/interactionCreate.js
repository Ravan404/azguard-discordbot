module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        console.log('interactionCreate tetiklendi.'); // Debug

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