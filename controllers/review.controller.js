import { Book } from "../models/book.model.js";

export const addReviewToBook = async (req, res) => {
    try {
        const { text, rating } = req.body;
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            {
                $push: { reviews: { text, rating } },
            },
            { new: true }
        );
        if (!book) {
            return res.status(404).json({ message: "Книга не найдена" });
        }

        res.status(201).json(book);
    } catch (e) {
        res.status(500).send(e.toString());
    }
};