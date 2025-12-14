const mongoose =require("mongoose");
const mongooseType = mongoose.Schema.Types;

const articleSchema = mongoose.Schema({
    article_title: {
        type: mongooseType.String,
        required: true,
        maxlenght: 60,
    },
    article_description: {
        type: mongooseType.String,
        required: true,
    },
    article_author: {
        type: mongooseType.ObjectId,
        required: true,
        ref: "User",
    },

    article_content: {
        type: mongooseType.String,
        required: true,
    },

    article_image: {
        
        image_url: {
            type: mongooseType.String,
            required: true,
        }, 
        image_public_id: {
            type: mongooseType.String,
            required: true,
        },
    },

    article_category: {
        type: mongooseType.ObjectId,
        required: true,
        ref: "Category"
    },

});

module.exports = mongoose.model("Article", articleSchema);