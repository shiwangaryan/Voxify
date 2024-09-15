const mongoose= require('mongoose');
const { Schema }= mongoose;

const NotificationSchema= new mongoose.Schema({
    recipientID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    notificationType: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    }
});

const Notification= mongoose.model('Notification', NotificationSchema);
module.exports= Notification;
