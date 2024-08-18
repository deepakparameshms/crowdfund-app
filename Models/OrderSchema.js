const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
    isPaid: Boolean,
    amount: Number,
    investor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    startup_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Startup"
    },
    payment_service: String,
    payment_mode: String,
    transaction_id: String,
    payment_info: {
        orderId: String,
        paymentId: String,
        signature: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;