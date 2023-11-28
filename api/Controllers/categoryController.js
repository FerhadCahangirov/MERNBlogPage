import Category from "../Models/Category.js";
import Post from '../Models/Post.js';

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        const posts = await Post.find();
        let categoriesList = [];
        categoriesList = await Promise.all(categories.map(async category => {
            let postsList = [];
            postsList = await Promise.all(posts.map(post => {
                if (post.category_id === category._id) {
                    return post
                }
            }))
            postsList = postsList.filter(Boolean);
            return { category: category, postsCount: postsList.length };
        }));
        categoriesList = categoriesList.filter(Boolean);
        res.status(200).json({ categoriesList });
    }
    catch (err) { next(err); }
}

export const getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);

    } catch (err) { next(err); }
}

export const createCategory = async (req, res, next) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json({ message: 'Category has been added successfully', success: 'true' });
    } catch (err) { next(err); }
}

export const deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'The category has been deleted successfully' });
    } catch (err) { next(err); }
}

export const updateCategory = async (req, res, next) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ message: 'Category has been updated successfully', success: 'true' });
    } catch (err) { next(err); }
}

