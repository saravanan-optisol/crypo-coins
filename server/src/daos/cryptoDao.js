const axios = require('axios');
const coinsSchema = require('../model/coins');

module.exports = {
  updateTopCryptos: async () => {
  let response = null;
  console.log('QWERTYUIOP');
      const params = {
        cryptocurrency_type: 'coins',
        limit: 100
      };
      const headers = {
        'X-CMC_PRO_API_KEY': '9f8646c3-bc70-4f7f-8041-afa7fbc2660e',
      }
      response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', { headers, params });
    console.log('RESP')
    if (response) {
      let data = response.data.data;
      let updateData = [];
      data.forEach(element => {
        let obj = {};

        const { price, percent_change_24h, percent_change_7d, market_cap, volume_24h } = element.quote.USD;
        obj.name = element.name;
        obj.price = price;
        obj.percent_change_24h = percent_change_24h;
        obj.percent_change_7d = percent_change_7d;
        obj.market_cap = market_cap;
        obj.volume_24h = volume_24h
        obj.circulating_supply = element.circulating_supply;

        updateData.push(obj);
      });

      const coins = new coinsSchema({record: updateData});
      await coins.save();
    } 
},
getTopCryptos: async () => {
    const cryptoData = await coinsSchema.findOne({}).sort({_id:-1}).limit(1);
    console.log(cryptoData, 'CDD');
    return cryptoData;
  }
}
