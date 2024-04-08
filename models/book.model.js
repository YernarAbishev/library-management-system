import mongoose from "mongoose";
import reviewSchema from "./review.model.js";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    publicationYear: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
    reviews: {
        type: [reviewSchema],
        default: []
    },
    readers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Reader",
        default: []
    }
});


export const Book = mongoose.model("Book", bookSchema);