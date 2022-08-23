const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinsSchema = new Schema({
   record: [{
      name: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      percent_change_24h: {
         type: Number,
         required: true,
      },
      percent_change_7d: {
         type: Number,
         required: true,
      },
      market_cap: {
         type: Number,
         required: true,
      },
      volume_24h: {
         type: Number,
         required: true,
      },
      circulating_supply: {
         type: Number,
         required: true,
      },
   }],
   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('coins', coinsSchema);