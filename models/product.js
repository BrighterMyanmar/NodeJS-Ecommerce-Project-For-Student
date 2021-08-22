const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price:{type: Number,required:true},
    brand:{type:String,required:true},
    images:{type:Array,required:true},
    catid:{type:Schema.Types.ObjectId,ref:"category"},
    subcatid:{type:Schema.Types.ObjectId,ref:"subcat"},
    childcatid:{type:Schema.Types.ObjectId,ref:"childcat"},
    discount:{type:Number,default:0},
    created: { type: Date, default: Date.now }
});

const Product = mongoose.model('product',ProductSchema);
module.exports = Product;
