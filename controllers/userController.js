const User = require('../models/User');
const Chat = require('../models/Chat');

exports.saveMessage = async(msg, recieverId, senderId) => {
    await Chat.create({
        message: msg,
        senderId: senderId,
        recieverId: recieverId
    }).then(data => console.log(data));
}