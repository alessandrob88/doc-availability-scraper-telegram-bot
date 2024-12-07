const axios = require('axios');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');

const scrapeData = require('./scraper');
const telegram = require('./telegram');

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;
const url = process.env.URL;
const keyword = process.env.KEYWORD;

(async () => {
    const bot = new TelegramBot(botToken, { polling: false });
    
    if (!botToken || !chatId) {
        console.error('BOT_TOKEN and CHAT_ID environment variables are required.');
        return;
    }
    try {
        const message = await scrapeData({
            axios,
            cheerio,
        }, {
            url,
            keyword
        });

        await telegram.sendNotification({ bot }, { chatId, message });
    } catch (error) {
        console.error('Error while scraping:', error);
    }
})();