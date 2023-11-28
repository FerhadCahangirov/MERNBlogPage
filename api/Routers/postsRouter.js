import express from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost, deleteImageFromAzure, uploadImageToLocal, deleteImageFromLocal, addComment, replyComment, likePost, likeComment, likeReplyComment } from '../Controllers/postController.js';
import multer from 'multer';
import { verifyAdmin } from '../Middleware/verifyAdmin.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } });


router.get('/query', getPosts);
router.get('/find/:id', getPost);
router.post('/', verifyAdmin, createPost);
router.put('/:id', verifyAdmin, updatePost);
router.delete('/:id', verifyAdmin, deletePost);
router.post('/upload/:id', upload.single("image"), verifyAdmin, uploadImageToLocal);
router.delete('/unupload/:id', verifyAdmin, deleteImageFromLocal);
router.post('/comments/:id', addComment);
router.post('/replycomments/:postId/:commentId', replyComment);
router.post('/likepost/:id', likePost);
router.post('/comments/likecomment/:postId/:commentId', likeComment);
router.post('/comments/likereplycomment/:postId/:commentId/:replyCommentId', likeReplyComment);

export default router;