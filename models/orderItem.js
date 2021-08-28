const mongoose = require('mongoose')
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
   order: { type: Schema.Types.ObjectId, required: true, ref:"order" },
   count: { type: Number, required: true },
   productId: { type: Schema.Types.ObjectId, requred: true, ref: "product" },
   name: { type: String, required: true },
   images: { type: Array, required: true },
   price: { type: Number, required: true },
   discount: { type: Number, default: 0 },
   status: { type: Boolean, default: false },
   created: { type: Date, default: Date.now }
});

const OrderItem = mongoose.model('orderItem', OrderItemSchema);
module.exports = OrderItem;
