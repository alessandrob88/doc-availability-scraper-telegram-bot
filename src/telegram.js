/**
 * Send a Telegram notification message to the given chatId.
 *
 * @param {Object} options
 * @param {TelegramBot} options.bot - The Telegram bot instance.
 * @param {Object} options.message - The message to send.
 * @param {string} options.message.chatId - The chat ID to send the message to.
 * @param {string} [options.message.text] - The message text to send.
 * @param {string} [options.message.parse_mode] - The parse mode of the message text.
 *
 * @returns {Promise<void>}
 */
const sendNotification = async ({ bot }, { chatId, message }) => {
  try {
    await bot.sendMessage(chatId, message);
    console.log('Message successfully sent!');
  } catch (error) {
    console.error('error while sending message:', error);
  }
}

exports.sendNotification = sendNotification;