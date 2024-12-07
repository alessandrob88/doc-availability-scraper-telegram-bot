const scrapeData = async ({ axios, cheerio }, { url, keyword }) => {
  try {
    console.log('td:contains("'+keyword+'")');
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const extractedData = $('td:contains("'+keyword+'")')
        .prev('td')
        .find('img')
        .attr('src');
    return parseData(extractedData);
  } catch (error) {
    console.error('Errore while scraping:', error);
    return null;
  }
}

const parseData = (data) => {
    return {
      'redflag.png': '🟥 Not Available',
      'arancio.png': '🟨 Partially available',
      'verde.png': '🟩 Available'
    }[data] || 'UNKNOWN';
}

module.exports = { scrapeData };