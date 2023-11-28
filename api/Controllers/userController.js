import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

export const getUsers = async (req, res, next) => {
    const page = req.query.page;
    const size = req.query.size;
    const content = req.query.content
    console.log(` <><><><><><><> CONTENT : ${content} <><><><><><><> `);
    try {
        const users = await User.find();
        let usersList = [];
        console.log("<><><> content <><><> : ", content)
        if (content.length === 0 || !content) {
            usersList = [...users];
        }
        else {
            usersList = await Promise.all(users.map(async user => {
                if (user.username.includes(content) || user.email.includes(content) || user.fullname.includes(content)) {
                    return user;
                }
            }));
            usersList = usersList.filter(Boolean);
        }
        res.status(200).json({ users: usersList.slice(page * size, page * size + size), totalCount: usersList.length });
    } catch (err) { next(err); }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const data = {
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            profileImageUrl: user.profileImageUrl
        };

        res.status(200).json(data);
    } catch (err) { next(err); }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'User has been removed', success: true });
    } catch (err) { next(err); }
}

export const updateUser = async (req, res, next) => {

    const { token } = req.cookies;
    console.log("TOKEN : ", token);

    try {
        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                if (err) throw err;
                console.log("USER : ", user);
                if (user.id === req.params.id) {
                    await User.findByIdAndUpdate(req.params.id, {
                        $set: {
                            fullname: req.body.fullname,
                            username: req.body.username,
                            email: req.body.email
                        }
                    }, { new: true });
                    res.status(200).json({ success: 'true', message: 'account info uptaded successfully' });
                } else
                    res.status(405).json({ success: 'false', message: 'you are not allowed for this action' });
            })
        }
        else
            res.status(405).json({ success: 'false', message: 'you are not allowed for this action' });
    } catch (error) { next(error); }
}

export const uploadProfileImage = async (req, res, next) => {

    const { token } = req.cookies;
    try {
        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                if (err) throw err;
                if (user.id === req.params.id) {
                    const { filename } = req.file;
                    console.log("FILE : ", filename);

                    const _filename = fileURLToPath(import.meta.url);
                    const __dirname = dirname(_filename);

                    if (!filename)
                        res.status(500).json({ message: 'No files have been chosen!', success: false });

                    const fileLocation = `http:\\\\127.0.0.1:8081\\${__dirname}\\..\\profiles\\${filename}`.replace("C:\\", "");

                    try {
                        const _user = await User.findByIdAndUpdate(req.params.id, {
                            $set: {
                                profileImageUrl: fileLocation
                            }
                        }, { new: true });
                        res.status(200).json({ message: 'File uploaded successfully.', success: true });
                    } catch (err) { throw err; }
                }
                else
                    res.status(405).json({ success: 'false', message: 'you are not allowed for this action' });
            })
        } else res.status(405).json({ success: 'false', message: 'you are not allowed for this action' });
    } catch (err) { next(err); }
}


export const removeProfileImage = async (req, res, next) => {

    const { token } = req.cookies;
    try {
        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                if (err) throw err;
                if (user.id === req.params.id) {
                    try {
                        const { profileImageUrl } = await User.findById(req.params.id)

                        const filename = profileImageUrl.split("\\").pop();
                        console.log("FILENAME : ", filename);

                        fs.unlink(`profiles/${filename}`, (err) => {
                            if (err) {
                                console.error(err);
                                res.status(500).json({ message: 'Failed to delete file', success: false });
                            } else {
                                User.findByIdAndUpdate(req.params.id, {
                                    $set:
                                    {
                                        profileImageUrl: "",
                                    }
                                }, { new: true }).then(response => {
                                    res.status(200).json({ message: 'File deleted successfully', success: true });
                                }).catch(err => {
                                    res.status(500).json({ message: 'Failed to delete file', success: false });
                                });
                            }
                        });
                    } catch (err) { throw err; }
                }
                else
                    res.status(405).json({ success: 'false', message: 'you are not allowed for this action' });
            })
        } else res.status(405).json({ success: 'false', message: 'you are not allowed for this action' });
    } catch (err) { next(err); }
}


