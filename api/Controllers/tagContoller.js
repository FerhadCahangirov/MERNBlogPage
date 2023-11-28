import Post from "../Models/Post.js";
import Service from "../Models/Service.js";
import Tag from "../Models/Tag.js";


export const getTags = async (req, res, next) => {
    const page = req.query.page;
    const size = req.query.size;
    const content = req.query.content
    console.log(` <><><><><><><> CONTENT : ${content} <><><><><><><> `);
    try {
        const tags = await Tag.find();
        let tagsList = [];
        console.log("<><><> content <><><> : ", content)
        if (content.length === 0 || !content) {
            tagsList = [...tags];
        }
        else {
            tagsList = await Promise.all(tags.map(async tag => {
                if (tag.content.includes(content)) {
                    return tag;
                }
            }));
            tagsList = tagsList.filter(Boolean);
        }
        res.status(200).json({ tags: tagsList.slice(page * size, page * size + size), totalCount: tagsList.length });
    } catch (err) { next(err); }
}

export const getTag = async (req, res, next) => {
    try {
        const tag = await Tag.findById(req.params.id);
        res.status(200).json(tag);
    } catch (err) { next(err); }
}

export const createTag = async (req, res, next) => {
    const newTag = new Tag(req.body);
    try {
        const savedTag = await newTag.save();
        res.status(200).json({ message: 'Tag has been added successfully', success: 'true' });
    } catch (err) { next(err); }
}

export const deleteTag = async (req, res, next) => {
    try {
        const tagId = req.params.id;

        await Post.updateMany(
            { tags: { $elemMatch: { tag_id: tagId } } },
            { $pull: { tags: { tag_id: tagId } } }
        );

        await Service.updateMany(
            { tags: { $elemMatch: { tag_id: tagId } } },
            { $pull: { tags: { tag_id: tagId } } }
        );


        await Tag.findByIdAndDelete(tagId);

        res.status(200).json({ success: true, message: 'The tag has been deleted successfully' });
    } catch (err) {
        next(err);
    }
};

export const updateTag = async (req, res, next) => {
    try {
        const updatedTag = await Tag.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json({ message: 'Tag has been updated successfully', success: true });
    } catch (err) { next(err); }
}