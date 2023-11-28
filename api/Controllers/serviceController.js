import Service from "../Models/Service.js";
import * as fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getServices = async (req, res, next) => {
    const page = req.query.page;
    const size = req.query.size;
    const content = req.query.content
    console.log(` <><><><><><><> CONTENT : ${content} <><><><><><><> `);
    try {
        const services = await Service.find();
        let servicesList = [];
        console.log("<><><> content <><><> : ", content)
        if (content === '' || !content) {
            servicesList = services;
        }
        else {
            servicesList = await Promise.all(services.map(async service => {
                if (service.title.includes(content) || service.description.includes(content)) {
                    return service;
                }
            }));

            servicesList = servicesList.filter(Boolean);
        }

        res.status(200).json({ services: servicesList.slice(page * size, page * size + size), totalCount: services.length });
    } catch (err) { next(err); }
}

export const getService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        res.status(200).json(service);
    } catch (err) { next(err); }
}

export const deleteService = async (req, res, next) => {
    try {
        const { imageUrl } = await Service.findById(req.params.id)
        if (imageUrl !== '') {
            const filename = imageUrl.split("\\").pop();

            fs.unlink(`serviceuploads/${filename}`, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Failed to delete file', success: false });
                }
            });
        }
    } catch (err) { next(err); }
    try {
        await Service.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Service has been deleted successfully', success: true });
    } catch (err) { next(err); }
}

export const createService = async (req, res, next) => {
    const newService = new Service(req.body);
    try {
        console.log(req.body);
        const savedService = await newService.save();
        res.status(200).json({ message: "Service has been created successfully", success: true });
    } catch (err) { next(err); }
}

export const updateService = async (req, res, next) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json({ message: 'Service has been updated successfully', success: true });
    } catch (err) { next(err); }
}

export const uploadServiceImageToLocal = async (req, res, next) => {

    const { filename } = req.file;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    if (!filename)
        res.status(500).json({ message: 'No files have been chosen!', success: false });

    const fileLocation = `http:\\\\127.0.0.1:8081\\${__dirname}\\..\\serviceuploads\\${filename}`.replace("C:\\", "");

    console.log("File Location = ", fileLocation);

    try {
        const _service = await Service.findByIdAndUpdate(req.params.id, {
            $set: {
                imageUrl: fileLocation
            }
        }, { new: true });
        res.status(200).json({ message: 'File uploaded successfully.', success: true });
    } catch (err) { next(err); }
}

export const deleteServiceImageFromLocal = async (req, res, next) => {
    try {
        const { imageUrl } = await Service.findById(req.params.id)

        const filename = imageUrl.split("\\").pop();

        fs.unlink(`serviceuploads/${filename}`, async (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Failed to delete file', success: false });
            } else {
                await Service.findByIdAndUpdate(req.params.id, {
                    $set:
                    {
                        imageUrl: "",
                    }
                }, { new: true }).then(response => {
                    res.status(200).json({ message: 'File deleted successfully', success: true });
                }).catch(err => {
                    res.status(500).json({ message: 'Failed to delete file', success: false });
                });
            }
        });
    } catch (err) { next(err); }
}

