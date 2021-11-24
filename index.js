const eris = require('eris');

// Create a Client instance with our bot token.
const bot = new eris.Client('OTEzMTU2MDczMjkxMTM3MDc2.YZ6Y3Q.Yev2z9qt_W2JPRAt0xSsyOW61c4');

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
   console.log('Connected and ready.');
});

function cmd_exec_err(error) {
    console.warn('Failed to respond to command execution.');
    console.warn(error);
}

// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
bot.on('messageCreate', async (msg) => {
   const botWasMentioned = msg.mentions.find(
       mentionedUser => mentionedUser.id === bot.user.id,
   );

   if (botWasMentioned) {
       try {
           await msg.channel.createMessage('Present');
       } catch (err) {
           // There are various reasons why sending a message may fail.
           // The API might time out or choke and return a 5xx status,
           // or the bot may not have permission to send the
           // message (403 status).
           console.warn('Failed to respond to mention.');
           console.warn(err);
       }
   }
});
bot.on('messageCreate', async (msg) => {
    let cmd = msg.content.split()[0].replace('!',"");
    if(cmd === "ping") {
      try {
        msg.channel.createMessage("Pong!");
      } catch (err) {
        cmd_exec_err(err);
      }
    } else if (cmd === "ssu" || cmd === "startup") {
        try {
            bot.createMessage('your channel id',"A server start up has just been announced! Come on down to Site-Delta!\nhttps://www.roblox.com/games/8020225889/Site-Delta");
        } catch (err) {
            cmd_exec_err(err)
        }
    }
})

bot.on('error', err => {
   console.warn(err);
});

bot.connect();
