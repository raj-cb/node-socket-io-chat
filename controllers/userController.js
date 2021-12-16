const User = require('../models/User');
const Chat = require('../models/Chat');

exports.saveMessage = async(msg, recieverId, senderId) => {
    await Chat.create({
        message: msg,
        senderId: senderId,
        recieverId: recieverId
    });
}

exports.updateUserSession = async(userId, status) => {
    await User.update({ socket_session: status }, { where: { id: userId } });
}

exports.checkUserSession = async(userId) => {
    return User.findOne({ where: { id: parseInt(userId) }, attributes: ['socket_session'] })
        .then(data => { return data.socket_session });
}