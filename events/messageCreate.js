module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // Slash komandaları üçün
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ 
                    content: 'Komanda icra edilərkən xəta baş verdi.', 
                    ephemeral: true 
                });
            }
        }

        // Button qarşılıqlı əlaqələri üçün (əgər lazımdırsa)
        if (interaction.isButton()) {
            // Button məntiqini buraya əlavə edə bilərsiniz
        }
    }
};