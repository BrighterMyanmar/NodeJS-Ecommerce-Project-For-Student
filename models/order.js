const mongoose = require('mongoose')
const { Schema } = mongoose;

const OrderSchema = new Schema({
   count: { type: Number, required: true },
   user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
   total: { type: Number, required: true },
   status: { type: Boolean, default: false },
   items: [{ type: Schema.Types.ObjectId, ref: 'orderItem' }],
   created: { type: Date, default: Date.now }
});

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
