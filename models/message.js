const mongoose = require('mongoose')
const { Schema } = mongoose;

const MessageSchema = new Schema({
   from: { type: Schema.Types.ObjectId, ref: "user", required:true},
   to: { type: Schema.Types.ObjectId, ref: "user", required:true},
   type: { type: String, required: true },
   msg: { type: String, required: true },
   created: { type: Date, default: Date.now }
});

const Message = mongoose.model('message', MessageSchema);
module.exports = Message;
