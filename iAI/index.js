const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "7498251188:AAHgr5CMyTVVBn7lCqaO0qTPrggucsCbbxY"; // Replace with your bot token
const gameName = "iAIGame"; // Replace with your game's short name
const gameUrl = "https://creative-kitten-7b721b.netlify.app/"; // Replace with your game URL

const bot = new TelegramBot(TOKEN, { polling: true });
const server = express();
const port = process.env.PORT || 5000;

// Respond to the /start or /game command to show the game
bot.onText(/start|game/, (msg) => {
    bot.sendGame(msg.from.id, gameName);
});

// Handle the callback query when the user clicks the "Play" button
bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, `Sorry, '${query.game_short_name}' is not available.`);
    } else {
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameUrl // Link to your game URL
        });
    }
});

// Start the Express server (even though it's not really doing much here)
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

