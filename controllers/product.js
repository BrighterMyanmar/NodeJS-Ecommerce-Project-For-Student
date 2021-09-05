const TB = require('../models/product');
const Gallery = require('../utils/gallery');

let add = async (req, res) => {
   let data = new TB(req.body);
   let result = await data.save();
   res.send({ con: true, 'msg': "Product Saved!", result });
}
let all = async (req, res) => {
   let result = await TB.find().populate('catid').populate('subcatid').populate('childcatid');
   res.send({ con: true, 'msg': "All Products!", result });
}
let get = async (req, res) => {
   let result = await TB.findById(req.params.id);
   res.send({ con: true, 'msg': "Single Product!", result });
}
let patch = async (req, res) => {
   await TB.findByIdAndUpdate(req.params.id, req.body);
   let result = await TB.findById(req.params.id);
   res.send({ con: true, 'msg': "Single Product!", result });
}
let drop = async (req, res) => {
   let product = await TB.findById(req.params.id);
   Gallery.deleteMultipleFiles(product.images);
   let result = await TB.findByIdAndDelete(req.params.id);
   res.send({ con: true, 'msg': "Single Product Delete!", result: product });
}
let paginate = async (req, res) => {
   let page = req.params.page;
   let skipCount = Number(page) == 1 ? 0 : (Number(page) - 1) * process.env.Limit;
   let result = await TB.find().skip(skipCount).limit(Number(process.env.Limit));
   res.send({ con: true, 'msg': "Single Product!", result });

}

module.exports = {
   add,
   all,
   get,
   patch,
   drop,
   paginate
}
