module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // Əgər buton kliklənmirsə, heç nə etmə
        if (!interaction.isButton()) return;

        const colors = [
            { name: 'Sarı', id: 'sari' },
            { name: 'Bənövşəyi', id: 'benovseyi' },
            { name: 'Mavi', id: 'mavi' },
            { name: 'Çəhrayı', id: 'cehrayi' },
            { name: 'Yaşıl', id: 'yasil' },
            { name: 'Narıncı', id: 'narinci' },
            { name: 'Boz', id: 'boz' },
            { name: 'Qara', id: 'qara' }
        ];

        const selectedColor = colors.find(color => color.id === interaction.customId);
        if (!selectedColor) return;

        try {
            const role = interaction.guild.roles.cache.find(r => r.name === selectedColor.name);
            if (!role) {
                return await interaction.reply({
                    content: '❌ Bu rəng üçün rol tapılmadı!',
                    ephemeral: true
                });
            }

            // İstifadəçinin mövcud rəng rollarını çıxır
            const memberRoles = interaction.member.roles.cache;
            const colorRoles = interaction.guild.roles.cache.filter(r => 
                colors.some(c => c.name === r.name)
            );

            for (const [_, colorRole] of colorRoles) {
                if (memberRoles.has(colorRole.id)) {
                    await interaction.member.roles.remove(colorRole);
                }
            }

            // Yeni rəng rolunu əlavə edir
            await interaction.member.roles.add(role);

            await interaction.reply({
                content: `✅ **${selectedColor.name}** rolu uğurla əlavə edildi!`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Xəta baş verdi:', error);
            await interaction.reply({
                content: '❌ Rəng rolu əlavə edilərkən xəta oldu.',
                ephemeral: true
            });
        }
    },
};