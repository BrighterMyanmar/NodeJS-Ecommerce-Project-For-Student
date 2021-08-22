const mongoose = require('mongoose')
const { Schema } = mongoose;

const ChildCatSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    subcatid: { type: Schema.Types.ObjectId, ref: "subcat" },
    created: { type: Date, default: Date.now }
});

const ChildCat = mongoose.model('childcat', ChildCatSchema);
module.exports = ChildCat;
