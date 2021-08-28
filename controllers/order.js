const TB = require('../models/order');
const ProductTB = require('../models/product');
const OrderItemTB = require('../models/orderItem');

let add = async (req, res) => {
   let data = new TB(req.body);
   let orderObj = {
      count: req.body.items.length,
      user: req.body.user.id,
      total: 1000
   }
   let dbOrderResult = await new TB(orderObj).save();
   let itemsTotal = 0;
   for (let item of req.body.items) {
      let product = await ProductTB.findById(item.id);
      let orderItem = {
         order: dbOrderResult._id,
         count: item.count,
         productId: product._id,
         name: product.name,
         images: product.images,
         price: product.price,
         discount: product.discount
      }
      itemsTotal += (item.count * product.price) - product.discount;
      let orderItemResult = await new OrderItemTB(orderItem).save();

      await TB.findByIdAndUpdate(dbOrderResult._id, { $push: { items: orderItemResult._id } });
   }
   await TB.findByIdAndUpdate(dbOrderResult._id, { total: itemsTotal });
   let result = await TB.findById(dbOrderResult._id);
   res.send({ con: true, 'msg': "Order Added", result: result });
}
let all = async (req, res) => {
   let result = await TB.find();
   res.send({ con: true, 'msg': "All models!", result });
}
let get = async (req, res) => {
   let result = await TB.findById(req.params.id).populate('items').populate('user', '-password -__v');
   res.send({ con: true, 'msg': "Single model!", result });
}
let patch = async (req, res) => {
   await TB.findByIdAndUpdate(req.params.id, req.body);
   let result = await TB.findById(req.params.id);
   res.send({ con: true, 'msg': "Single model!", result });
}
let drop = async (req, res) => {
   let result = await TB.findByIdAndDelete(req.params.id);
   res.send({ con: true, 'msg': "Single model!", result });
}
let getMyOrder = async (req, res) => {
   let result = await TB.find({user: req.body.user.id}).populate("items");
   res.send({ con: true, 'msg': "Singel User Order History", result });
}

module.exports = {
   add,
   all,
   get,
   patch,
   drop,
   getMyOrder
}
