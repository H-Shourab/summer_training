const axios = require("axios");
  async function getsports() {
    try {
      const response = await axios.get('https://app.sportdataapi.com/api/v1/soccer/matches?apikey=2ec45a40-1080-11ed-9c84-d9a72821bb2f&season_id=496&date_from=2020-09-19');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  module.exports = { getsports }
  