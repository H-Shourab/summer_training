const axios = require("axios");
var name = 'cheetah';
  async function getanimals() {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/animals?name=' + name);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  module.exports = { getanimals}