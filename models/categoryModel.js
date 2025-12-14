const mongoose = require("mongoose");
const mongooseType = mongoose.Schema.Types;

module.exports = mongoose.model("Category", mongoose.Schema({
    category_name: {
        type: mongooseType.String,
        required: true,
    },
    category_author: {
        type: mongooseType.ObjectId,
        required: true,
    }
}));