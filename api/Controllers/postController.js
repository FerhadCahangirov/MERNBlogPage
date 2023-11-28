import Post from '../Models/Post.js';
import azure from 'azure-storage';
import * as fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
import Tag from '../Models/Tag.js';
import Category from '../Models/Category.js';

const findTotalCommentsLength = async (comments) => {
    if (!comments || comments.length === 0) {
        return 0; // No comments, so the count is zero.
    }

    let totalCommentsCount = 0;

    const countCommentsRecursively = async (comment) => {
        totalCommentsCount += 1; // Count the current comment.

        if (comment.replyComments && comment.replyComments.length > 0) {
            // Recursively count the reply comments.
            await Promise.all(comment.replyComments.map(async (replyComment) => {
                await countCommentsRecursively(replyComment);
            }));
        }
    };

    // Iterate through top-level comments and start counting.
    await Promise.all(comments.map(async (comment) => {
        await countCommentsRecursively(comment);
    }));

    return totalCommentsCount;
};

export const createPost = async (req, res, next) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json({ message: "Post has been created successfully", success: true });
    } catch (err) { next(err); }
};

export const updatePost = async (req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) { next(err); }
};

export const deletePost = async (req, res, next) => {
    const blobService = azure.createBlobService(process.env.AZURE_ACCOUNT_NAME, process.env.AZURE_ACCOUNT_KEY);
    const containerName = 'images';
    try {
        const post = await Post.findById(req.params.id);
        const blobName = post.blobName ? post.blobName : null;
        if (blobName) {
            blobService.deleteBlob(containerName, blobName, (error) => {
                if (error) next(error);
            });
        }
        else {
            try {
                const { imageUrl } = await Post.findById(req.params.id)
                if (imageUrl !== '') {
                    const filename = imageUrl.split("\\").pop();

                    fs.unlink(`uploads/${filename}`, (err) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ message: 'Failed to delete file', success: false });
                        }
                    });
                }
            } catch (err) { next(err); }
        }
        try {
            await Post.findByIdAndRemove(req.params.id);
            res.status(200).json({ success: true, message: 'The post has been deleted successfully' });
        } catch (err) { next(err); }
    } catch (err) { next(err); }
};

export const getPost = async (req, res, next) => {
    const { token } = req.cookies;
    try {
        let liked = false;

        console.log("TOKEN : ", token);

        let activeUserId = null;

        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                if (err) throw err;
                console.log("User : ", user);
                activeUserId = user.id;
            });
        }

        console.log("Active user id : ", activeUserId);

        const postData = await Post.findById(req.params.id);

        let comments = [];

        if (postData && postData.comments) {
            await Promise.all(
                postData.comments.map(async (comment) => {
                    const commentUser = await User.findById(comment.userId);
                    let replyCommentsList = [];
                    let likedComment = false;

                    if (activeUserId && comment.likes && comment.likes.find(like => like.userId == activeUserId))
                        likedComment = true;

                    if (comment.replyComments) {
                        await Promise.all(
                            comment.replyComments.map(async (replyComment) => {
                                const replyCommentUser = await User.findById(replyComment.userId);
                                let likedReplyComment = false;
                                if (activeUserId && replyComment.likes && replyComment.likes.find(like => like.userId == activeUserId))
                                    likedReplyComment = true;
                                replyCommentsList.push({
                                    user: {
                                        _id: replyCommentUser._id,
                                        username: replyCommentUser.username,
                                        fullname: replyCommentUser.fullname,
                                        profileImageUrl: replyCommentUser.profileImageUrl,
                                    },
                                    replyComment: {
                                        _id: replyComment._id,
                                        content: replyComment.content,
                                        likes: replyComment.likes.length,
                                        liked: likedReplyComment,
                                        replyComments: replyComment.replyComments,
                                        createdDate: replyComment.createdDate,
                                    },
                                });
                            })
                        );
                    }

                    replyCommentsList.sort((a, b) => new Date(a.replyComment.createdDate) - new Date(b.replyComment.createdDate));

                    if (comment) {
                        comments.push({
                            user: {
                                _id: commentUser._id,
                                username: commentUser.username,
                                fullname: commentUser.fullname,
                                profileImageUrl: commentUser.profileImageUrl,
                            },
                            comment: {
                                _id: comment._id,
                                content: comment.content,
                                likes: comment.likes.length,
                                liked: likedComment,
                                replyComments: replyCommentsList,
                                createdDate: comment.createdDate,
                            },
                        });
                    }
                })
            );
        }

        if (activeUserId && postData && postData.likes && postData.likes.find(like => like.userId == activeUserId))
            liked = true;

        const category = await Category.findById(postData.category_id);

        const totalCommentsCount = await findTotalCommentsLength(comments);

        const tags = await Promise.all(postData.tags.map(async tag => await Tag.findById(tag.tag_id)));

        comments.sort((a, b) => new Date(b.comment.createdDate) - new Date(a.comment.createdDate));

        res.status(200).json({
            _id: postData._id,
            title: postData.title,
            description: postData.description,
            content: postData.content,
            imageUrl: postData.imageUrl,
            blobName: postData.blobName,
            liked: liked,
            createdDate: postData.createdDate,
            updatedDate: postData.updatedDate,
            totalLikesCount: postData.likes.length,
            totalCommentsCount: totalCommentsCount,
            category: category,
            tags: tags,
            comments: comments,
        });
    } catch (err) {
        next(err);
    }
};


export const getPosts = async (req, res, next) => {
    const page = req.query.page;
    const size = req.query.size;
    const content = req.query.content;
    const { token } = req.cookies;
    let activeUserId = null;
    console.log(` <><><><><><><> CONTENT : ${content} <><><><><><><> `);

    if (isNaN(page) || isNaN(size) || page < 0 || size <= 0) {
        return res.status(400).json({ error: "Invalid page or size parameters" });
    }

    try {
        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                if (err) throw err;
                activeUserId = user.id;
            });
        }

        const posts = await Post.find();

        let postList = [];

        if (content === '' || !content) {
            postList = await Promise.all(posts.map(async post => {
                const totalCommentsCount = await findTotalCommentsLength(post.comments);
                const liked = activeUserId && post.likes.find(like => like.userId === activeUserId) ? true : false;
                const totalLikesCount = post.likes.length;
                const category = await Category.findById(post.category_id);
                const tags = await Promise.all(post.tags.map(async tag => await Tag.findById(tag.tag_id)));

                return {
                    _id: post._id,
                    title: post.title,
                    description: post.description,
                    content: post.content,
                    imageUrl: post.imageUrl,
                    blobName: post.blobName,
                    liked: liked,
                    createdDate: post.createdDate,
                    updatedDate: post.updatedDate,
                    totalLikesCount: totalLikesCount,
                    totalCommentsCount: totalCommentsCount,
                    category: category,
                    tags: tags,
                };
            }));
        }
        else {
            postList = await Promise.all(posts.map(async post => {
                if (post.title.includes(content) || post.description.includes(content)) {
                    const totalCommentsCount = await findTotalCommentsLength(post.comments);
                    const liked = activeUserId && post.likes.find(like => like.userId === activeUserId) ? true : false;
                    const totalLikesCount = post.likes.length;
                    const category = await Category.findById(post.category_id);
                    const tags = await Promise.all(post.tags.map(async tag => await Tag.findById(tag.tag_id)));

                    return {
                        _id: post._id,
                        title: post.title,
                        description: post.description,
                        content: post.content,
                        imageUrl: post.imageUrl,
                        blobName: post.blobName,
                        liked: liked,
                        createdDate: post.createdDate,
                        updatedDate: post.updatedDate,
                        totalLikesCount: post.likes.length,
                        totalCommentsCount: totalCommentsCount,
                        category: category,
                        tags: tags
                    };
                }
            }));
        }

        const filteredPostList = postList.filter(Boolean);

        console.log(` <><><><><><><> POSTS START <><><><><><><> \n\n`);
        filteredPostList.slice(page * size, page * size + size).map(post => console.log(post));
        console.log(` <><><><><><><> POSTS END <><><><><><><> \n\n`);

        res.status(200).json({ posts: filteredPostList.slice(page * size, page * size + size), totalCount: filteredPostList.length });
    } catch (err) { next(err); }
};

export const uploadImageToAzure = async (req, res, next) => {

    const blobService = azure.createBlobService(process.env.AZURE_ACCOUNT_NAME, process.env.AZURE_ACCOUNT_KEY);
    const containerName = 'images';

    console.log(req.file);

    const blobName = req.file.originalname;
    const stream = fs.createReadStream(req.file.path);
    const streamLength = req.file.size;

    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, (error) => {
        if (error)
            next(error);
        else {
            fs.unlink(req.file.path, (error) => {
                if (error)
                    next(error);
            });
        }
    });

    try {
        const uploadedPostImage = await Post.findByIdAndUpdate(req.params.id, {
            $set:
            {
                imageUrl: `https://${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${blobName}`,
                blobName: blobName
            }
        }, { new: true });

        console.log(uploadedPostImage);

        res.status(200).json({ "success": "Uploaded succesfully" });

    } catch (err) { next(err); }
};


export const uploadImageToLocal = async (req, res, next) => {

    const { filename } = req.file;
    const PORT = '8081';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    if (!filename)
        res.status(500).json({ message: 'No files have been chosen!', success: false });

    const fileLocation = `http:\\\\127.0.0.1:${PORT}\\${__dirname}\\..\\uploads\\${filename}`.replace("D:\\", "").replace("C:\\", "")

    console.log("File Location = ", fileLocation);


    try {
        const _post = await Post.findByIdAndUpdate(req.params.id, {
            $set:
            {
                imageUrl: fileLocation
            }
        }, { new: true });

        res.status(200).json({ message: 'File uploaded successfully.', success: true });
    } catch (err) { next(err); }
}

export const deleteImageFromLocal = async (req, res, next) => {

    try {
        const { imageUrl } = await Post.findById(req.params.id)

        const filename = imageUrl.split("\\").pop();

        fs.unlink(`uploads/${filename}`, err => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Failed to delete file', success: false });
            } else {
                Post.findByIdAndUpdate(req.params.id, {
                    $set:
                    {
                        imageUrl: "",
                    }
                }, { new: true }).then(response => {
                    res.json({ message: 'File deleted successfully', success: true });
                }).catch(err => {
                    res.status(500).json({ message: 'Failed to delete file', success: false });
                });
            }
        });
    } catch (err) { next(err); }
}

export const deleteImageFromAzure = async (req, res, next) => {

    const blobService = azure.createBlobService(process.env.AZURE_ACCOUNT_NAME, process.env.AZURE_ACCOUNT_KEY);
    const containerName = 'images';

    const blobName = req.params.blobName;

    blobService.deleteBlob(containerName, blobName, (error) => {
        if (error) next(error);
    });
    try {
        const deletedPostImage = await Post.findByIdAndUpdate(req.params.id, {
            $set:
            {
                imageUrl: "",
                blobName: ""
            }
        }, { new: true });

        console.log(blobName, deletedPostImage);

        res.status(200).json({ 'success': 'Deleted successful' });
    } catch (err) { next(err); }
}

export const addComment = async (req, res, next) => {
    const { token } = req.cookies;
    try {
        let activeUserId = null;
        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                if (err) console.log(err);
                console.log("User : ", user);
                activeUserId = user.id;
            });
        }
        if (activeUserId) {
            const post = await Post.findById(req.params.id);
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: {
                    comments: [...post.comments, { userId: activeUserId, content: req.body.content }]
                }
            }, { new: true });
            res.status(200).json({ message: 'comment has posted successfully.', success: 'true' });
        } else res.status(400).json({ success: false, message: 'unauthorized' });
    } catch (err) { next(err); }
}

export const replyComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { token } = req.cookies;
    try {
        let activeUserId = null;
        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                if (err) console.log(err);
                console.log("User : ", user);
                activeUserId = user.id;
            });
        }
        if (activeUserId) {
            const post = await Post.findById(postId);
            const comment = post.comments.find(comment => comment._id == commentId);
            comment.replyComments.push({ userId: activeUserId, content: req.body.content });
            await post.save();
            res.status(200).json({ success: true, message: 'replyed' });
        }
        else res.status(400).json({ success: false, message: 'unauthorized' });
    } catch (err) { next(err); }
}

export const likeComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { token } = req.cookies;
    try {
        const post = await Post.findById(postId);
        const comment = post.comments.find(comment => comment._id == commentId);

        let activeUserId = null;

        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                if (err) throw err;
                console.log("User : ", user);
                activeUserId = user.id;
            });

            console.log("Active user id : ", activeUserId);

            if (comment.likes.find(like => like.userId == activeUserId)) {
                comment.likes = comment.likes.filter(_like => _like.userId != activeUserId);
                await post.save();
                res.status(200).json({ 'success': true, 'message': 'unliked' });
            }
            else {
                comment.likes.push({ userId: activeUserId });
                await post.save();
                res.status(200).json({ success: true, message: 'liked' });
            }
        } else res.status(400).json({ success: false, message: 'unauthorized' });

    } catch (err) { next(err); }
}

export const likeReplyComment = async (req, res, next) => {
    const { postId, commentId, replyCommentId } = req.params;
    const { token } = req.cookies;
    try {
        const post = await Post.findById(postId);
        const comment = post.comments.find(comment => comment._id == commentId);
        const replyComment = comment.replyComments.find(replyComment => replyComment._id == replyCommentId);

        let activeUserId = null;

        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                if (err) throw err;
                console.log("User : ", user);
                activeUserId = user.id;
            });

            console.log("Active user id : ", activeUserId);

            if (replyComment.likes.find(like => like.userId == activeUserId)) {
                replyComment.likes = replyComment.likes.filter(_like => _like.userId != activeUserId);
                await post.save();
                res.status(200).json({ success: true, message: 'unliked' });
            }
            else {
                replyComment.likes.push({ userId: activeUserId });
                await post.save();
                res.status(200).json({ success: true, message: 'liked' });
            }

        } else res.status(400).json({ success: false, message: 'unauthorized' });
    } catch (err) { next(err); }
}

export const likePost = async (req, res, next) => {
    const { token } = req.cookies;
    try {
        const post = await Post.findById(req.params.id);

        let activeUserId = null;

        if (token) {

            await jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
                if (err) throw err;
                console.log("User : ", user);
                activeUserId = user.id;
            });
            console.log("Active user id : ", activeUserId);

            if (post.likes.find(like => like.userId == activeUserId)) {
                post.likes = post.likes.filter(_like => _like.userId != activeUserId);
                await post.save();
                res.status(200).json({ success: true, message: 'unliked' });
            }
            else {
                post.likes.push({ userId: activeUserId });
                await post.save();
                res.status(200).json({ success: true, message: 'liked' });
            }
        } else res.status(400).json({ success: false, message: 'unauthorized' });

    } catch (err) { next(err); }
}


export const deleteComments = async (req, res, next) => {
    try {

    } catch (err) { next(err); }
}

export const updateComments = async (req, res, next) => {
    try {

    } catch (err) { next(err); }
}
