import { Reader } from "../models/reader.model.js";
import { Book } from "../models/book.model.js";

export const getReaderList = async (req, res) => {
    try {
        const readers = await Reader.find().populate("books");
        res.json(readers);
    } catch (e) {
        res.status(500).send(e.toString());
    }
};

export const createReader = async (req, res) => {
    try {
        const newReader = new Reader(req.body);
        const savedReader = await newReader.save();
        res.status(201).json(savedReader);
    } catch (e) {
        res.status(500).send(e.toString());
    }
};

export const getReaderById = async (req, res) => {
    try {
        const reader = await Reader.findById(req.params.id).populate("books");
        if (!reader) {
            return res.status(404).json({ message: "Читатель не найден" });
        }
        res.json(reader);
    } catch (e) {
        res.status(500).send(e.toString());
    }
};

export const updateReader = async (req, res) => {
    try {
        const updatedReader = await Reader.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReader) {
            return res.status(404).json({ message: "Читатель не найден" });
        }
        res.json(updatedReader);
    } catch (e) {
        res.status(500).send(e.toString());
    }
};

export const deleteReader = async (req, res) => {
    try {
        const reader = await Reader.findByIdAndDelete(req.params.id);
        if (!reader) {
            return res.status(404).json({ message: "Читатель не найден" });
        }
        res.status(204).send({ message: "Читатель удален" });
    } catch (e) {
        res.status(500).send(e.toString());
    }
};

export const createBookToReader = async (req, res) => {
    try {
        const { readerId, bookId } = req.params;
        const reader = await Reader.findByIdAndUpdate(readerId, {
            $push: { books: bookId },
        });
        const book = await Book.findByIdAndUpdate(bookId, {
            $push: { readers: readerId },
        });

        if (!reader || !book) {
            return res.status(404).json({ message: "Читатель или книга не найден" });
        }

        res.status(201).send({ message: "Книга успешно добавлена читателю" });
    } catch (e) {
        res.status(500).send(e.toString());
    }
};

export const deleteBookFromReader = async (req, res) => {
    try {
        const { readerId, bookId } = req.params;
        const reader = await Reader.findByIdAndUpdate(readerId, {
            $pull: { books: bookId },
        });

        const book = await Book.findByIdAndUpdate(bookId, {
            $pull: { readers: readerId },
        });

        if (!reader || !book) {
            return res.status(404).json({ message: "Читатель или книга не найден" });
        }

        res.send({ message: "Книга успешно удалена у читателя" });
    } catch (e) {
        res.status(500).send(e.toString());
    }
};