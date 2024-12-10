/**
 * Scrape a web page and extracts data from it.
 *
 * @param {Object} opts - Object containing required dependencies.
 * @param {Object} opts.axios - Axios instance.
 * @param {Object} opts.cheerio - Cheerio instance.
 * @param {Object} params - Object containing required parameters.
 * @param {String} params.url - The URL to scrape.
 * @param {String} params.keyword - The keyword to search.
 *
 * @returns {String} The extracted data.
 */
const scrapeData = async ({ axios, cheerio }, { url, keyword }) => {
  try {
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

/**
 * Parses the image filename and returns the corresponding availability status.
 *
 * @param {String} data - The image filename to parse (e.g., 'redflag.png').
 * @returns {String} The availability status associated with the image filename.
 *                  Returns 'UNKNOWN' if the filename is not recognized.
 */
const parseData = (data) => {
    return {
      'redflag.png': '🟥 Not Available',
      'arancio.png': '🟨 Partially available',
      'greenflag.png': '🟩 Available'
    }[data] || 'UNKNOWN';
}

module.exports = { scrapeData };