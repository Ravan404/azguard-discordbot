module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Bot aktiv olaraq qoşuldu: ${client.user.tag}`);
        client.user.setPresence({
            activities: [{ name: 'VALORANT', type: 0 }],
            status: 'online'
        });
    },
};