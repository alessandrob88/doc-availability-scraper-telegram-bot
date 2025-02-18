const axios = require('axios');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');

const scraper = require('./scraper');
const telegram = require('./telegram');

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;
const url = process.env.URL;
const keywords = process.env.KEYWORD.split(',');

(async () => {
    const bot = new TelegramBot(botToken, { polling: false });
    
    if (!botToken || !chatId) {
        console.error('BOT_TOKEN and CHAT_ID environment variables are required.');
        return;
    }
    try {
        const message = await scraper.scrapeData({
            axios,
            cheerio,
        }, {
            url,
            keywords
        });

        await telegram.sendNotification({ bot }, { chatId, message });
    } catch (error) {
        console.error('Error while scraping:', error);
    }
})();