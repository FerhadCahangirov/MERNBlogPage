import express from 'express';
import { createService, deleteService, deleteServiceImageFromLocal, getService, getServices, updateService, uploadServiceImageToLocal } from '../Controllers/serviceController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'serviceuploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now() + '.jpg');
    }
});

const upload = multer({ storage: storage });

router.get('/query', getServices);
router.get('/find/:id', getService);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);
router.post('/upload/:id', upload.single("image"), uploadServiceImageToLocal);
router.delete('/unupload/:id', deleteServiceImageFromLocal);

export default router;