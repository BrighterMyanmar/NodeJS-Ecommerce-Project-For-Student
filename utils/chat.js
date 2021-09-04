const Redis = require('./redis');
const UnreadDB = require('../models/unread');
const MessageDB = require('../models/message');

let liveUser = async (socketId, user) => {
   user['socketId'] = socketId;
   await Redis.setObj(socketId, user.id);
   await Redis.setObj(user.id, user);
}

let initialize = async (io, socket) => {
   socket['currentUserId'] = socket.userData.id;
   await liveUser(socket.id, socket.userData);

   socket.on('unread', data => sendUnreadMsg(socket));
   socket.on('message', data => incommingMessage(io, socket, data));
   socket.on('load-more', data => loadMore(socket, data));
}

let loadMore = async (socket, data) => {
   let limit = Number(process.env.MSG_LIMIT);
   let skip = data.page == 0 ? 0 : Number(data.page) * limit;
   let messages = await MessageDB.find({ $or: [{ from: socket.currentUserId }, { to: socket.currentUserId }] })
      .sort({ created: -1 }).skip(skip).limit(limit).populate('from to', 'name _id');
   socket.emit('messages', messages);
}

let incommingMessage = async (io, socket, message) => {
   let sm = await new MessageDB(message).save();
   let msgResult = await MessageDB.findOne({ _id: sm._id }).populate('from to', 'name _id');

   let toUser = await Redis.getObj(message.to);

   if (toUser) {
      let toSocket = io.of('/chat').sockets.get(toUser.socketId);
      if (toSocket) {
         toSocket.emit('message', msgResult);
      }
   } else {
      await new UnreadDB({ "from": message.from, "to": message.to }).save();
   }
   socket.emit('message', msgResult);
}

let sendUnreadMsg = async (socket) => {
   let unreads = await UnreadDB.find({ to: socket.currentUserId });
   if (unreads.length > 0) {
      unreads.forEach(async (unread) => {
         await UnreadDB.findByIdAndDelete(unread._id);
      })
   }
   socket.emit("unread", { msg: unreads.length });
}

module.exports = {
   initialize
}