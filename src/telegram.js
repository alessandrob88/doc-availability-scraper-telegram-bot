const sendNotification = async ({ bot }, { chatId, message }) => {
  try {
    await bot.sendMessage(chatId, message);
    console.log('Messaggio inviato con successo!');
  } catch (error) {
    console.error('Errore durante l\'invio del messaggio:', error);
  }
}

exports.sendNotification = sendNotification;