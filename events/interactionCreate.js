module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`${interaction.commandName} komutu bulunamadı.`);
            await interaction.reply({
                content: '❌ Komut bulunamadı!',
                ephemeral: true
            });
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error('Komut sırasında bir hata oluştu:', error);
            await interaction.reply({
                content: '❌ Komut çalıştırılırken bir hata oluştu!',
                ephemeral: true
            });
        }
    },
};