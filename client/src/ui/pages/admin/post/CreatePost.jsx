import { Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Loader from "../../../components/Loader";
import Tag from "../../../components/Tag";
import { useCreatePostReducer } from '../../../../customHooks/postCustomHooks';
import JoditEditor from 'jodit-react';
import { textarea_config } from "../../../../config/textareaconfig";
import CategorySearchComboBox from "../../../components/CategorySearchComboBox";
import { useGetCategoryReducer } from "../../../../customHooks/categoryCustomHooks";
import TagSearchComboBox from "../../../components/TagSearchComboBox";

const CreatePost = () => {
    const { success, errorData, error, createPost, Title_Encapsulated, Description_Encapsulated, Content_Encapsulated, Tags_Encapsulated, Category_Encapsulated } = useCreatePostReducer();
    const { categoryLoading, CategoryContent_Encapsulated, FileteredCategories_Encapsulated } = useGetCategoryReducer();

    return categoryLoading  ? <Loader /> : success ? <Navigate to={'/admin'} /> : (
        <div className='main_content_create_iner overly_inner'>
            <div className="row">
                <div className="col-12">
                    <div className="page_title_box d-flex align-items-center justify-content-between">
                        <div className="page_title_left">
                            <h3 className="f_s_30 f_w_700 text_white">Create Post</h3>
                            <ol className="breadcrumb page_bradcam mb-0">
                                <li className="breadcrumb-item"><a href="/admin">Admin Panel</a></li>
                                <li className="breadcrumb-item active">Create Post</li>
                            </ol>
                        </div>
                        <CategorySearchComboBox selected={Category_Encapsulated.get} setSelected={Category_Encapsulated.set} categories={FileteredCategories_Encapsulated.get} content={CategoryContent_Encapsulated.get} setContent={CategoryContent_Encapsulated.set} />
                    </div>
                </div>
            </div>
            <div className="create_post_container">
                <div className='create_post_container_card'>
                    <div className="create_post_container_card_body">

                        <input className="title_input" placeholder="Title..." value={Title_Encapsulated.get} onChange={event => Title_Encapsulated.set(event.target.value)} />
                        <textarea className="description_input" placeholder="Descriptption..." value={Description_Encapsulated.get} onChange={event => Description_Encapsulated.set(event.target.value)} onInput={event => {
                            event.target.style.height = 'auto';
                            event.target.style.height = event.target.scrollHeight + 'px';
                        }}></textarea>

                        <JoditEditor
                            value={Content_Encapsulated.get}
                            config={textarea_config}
                            tabIndex={1}
                            onBlur={newContent => Content_Encapsulated.set(newContent)}
                        />

                    </div >

                </div >

                <div className="create_post_tags_container">
                    <TagSearchComboBox setTagsList={Tags_Encapsulated.set} tagsList={Tags_Encapsulated.get} />
                    <div className="tags_field" data-aos="flip-up">
                        {Tags_Encapsulated.get && Tags_Encapsulated.get.map((tag, index) => {
                            return <Tag tagId={tag._id} content={tag.content} setTagsList={Tags_Encapsulated.set} tagsList={Tags_Encapsulated.get} index={index} editable={true}/>;
                        })}
                    </div>
                </div>

                < div className="card_actions" >
                    <i onClick={createPost} className="fa-solid fa-circle-check"></i>
                </div>
            </div>

        </div>
    )
};



export default CreatePost;