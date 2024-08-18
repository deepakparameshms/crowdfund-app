const mongoose = require("mongoose");
const StartupSchema = new mongoose.Schema({
    Founder_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Name: {
        type: String,
        unique: true
    },
    isVerified: { type: Boolean, default: true },
    Description: String,
    Category: String,
    Vision: String,
    Problemstatement: String,
    Solution: String,
    Website: { type: String, unique: true },
    Email: { type: String, unique: true },
    Instagram: { type: String, unique: true },
    LinkedIn: { type: String, unique: true },
    LogoUrl: { type: String, unique: true },
    Ask: { type: Number, default: 0 },
    Current: { type: Number, default: 0 },
    Backers: { type: Number, default: 0 }
})
const Startup = mongoose.model("project", StartupSchema);
Startup.createIndexes();
module.exports = Startup;