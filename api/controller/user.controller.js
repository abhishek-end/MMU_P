import bcrypt from "bcrypt";
// import express from "express"
import User from '../models/user.model.js';
import handleError from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        message: "Testing API server From Controller.js",
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(handleError(401, "You can Only Update Your own Account"));
    }
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        // Optionally include the error message in the response
        res.status(500).json({ error: error.message });
    }
};
