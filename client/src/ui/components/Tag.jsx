import React from 'react'

export const Tag = ({ content, tagId, setTagsList, tagsList, index, editable }) => {
    const colors = ['#a972cb', '#ef6eae', '#ff7f82', '#ffa260', '#e4cb58', '#8fc866', '#19bc8b']
    const removeTag = () => {
        setTagsList(tagsList.filter(tag => tag._id !== tagId));
    }
    return (<a><span className="tag" style={{ "backgroundColor": colors[index % 5] }}>
        <i className="fa-solid fa-tag"></i>
        {content}
        { editable && <i className="fa-solid fa-remove" onClick={() => removeTag()}></i> }
    </span></a>)
}
export default Tag