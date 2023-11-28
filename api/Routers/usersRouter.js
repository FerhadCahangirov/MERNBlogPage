import express from 'express';
import { deleteUser, getUser, getUsers, removeProfileImage, updateUser, uploadProfileImage } from '../Controllers/userController.js';
import multer from 'multer';
import { verifyAdmin } from '../Middleware/verifyAdmin.js';


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profiles');
    },
    filename: (req, file, cb) => {
        console.log("UPLOAD : ", file);
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

const upload = multer({ storage: storage });

router.post("/upload/:id", upload.single('image'), uploadProfileImage);

router.get("/query", getUsers);
router.get("/find/:id", getUser);
router.put("/:id", updateUser);
router.delete("/unupload/:id", removeProfileImage);
router.delete('/remove/:id', verifyAdmin, deleteUser);

export default router;