// events/interactionCreate.js
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;

        // Rol ID'leri (bunları kendi sunucunuzdaki rol ID'leri ile değiştirin)
        const roles = {
            'kirmizi': '1364829561203982346',
            'mavi': '1364829631076634685',
            'yesil': '1364829678380122173',
            'mor': '1364829725276766368'
        };

        // Butona tıklayan kullanıcı ve rol
        const member = interaction.member;
        const roleId = roles[interaction.customId];

        if (!roleId) return;

        try {
            // Eğer rol varsa kaldır, yoksa ekle
            if (member.roles.cache.has(roleId)) {
                await member.roles.remove(roleId);
                await interaction.reply({ 
                    content: `✅ ${interaction.component.label} renk rolü kaldırıldı!`, 
                    ephemeral: true 
                });
            } else {
                // Diğer renk rollerini kaldır
                for (const otherRoleId of Object.values(roles)) {
                    if (member.roles.cache.has(otherRoleId)) {
                        await member.roles.remove(otherRoleId);
                    }
                }
                
                await member.roles.add(roleId);
                await interaction.reply({ 
                    content: `✅ ${interaction.component.label} renk rolü verildi!`, 
                    ephemeral: true 
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: '❌ Rol verirken bir hata oluştu!', 
                ephemeral: true 
            });
        }
    },
};