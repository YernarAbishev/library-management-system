import { Author } from "../models/author.model.js";


export const getAuthorList = async (req, res) => {
    try {
        const authors = await Author.find().populate("book");
        res.json(authors);
    } catch (e) {
        res.status(500).send(e.toString());
    }
};

export const createAuthor = async (req, res) => {
    try {
        const newAuthor = new Author(req.body);
        const savedAuthor = await newAuthor.save();
        res.status(201).json(savedAuthor);
    } catch (e) {
        res.status(500).send(e.toString());
    }
};

export const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate("book");
        if (!author) {
            return res.status(404).send({ message: "Автор не найден" });
        }
        res.json(author);
    } catch (e) {
        res.status(500).send(e.toString());
    }
};

export const updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.body,
            req.body,
            { new: true }
        );
        if (!updatedAuthor) {
            res.status(404).send({ message: "Автор не найден" });
        }
        res.json(updatedAuthor);
    } catch (e) {
        res.status(500).send(e.toString());
    }
};

export const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).send({ message: "Автор не найден" });
        }
        res.status(201).send({ message: "Автор удален" });
    } catch (e) {
        res.status(500).send(e.toString());
    }
};