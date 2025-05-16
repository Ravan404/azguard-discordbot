module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Bot aktiv olaraq qoşuldu: ${client.user.tag}`);
    client.user.setActivity('VALORANT', { type: ActivityType.Playing });
  },
};