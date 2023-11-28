import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tag from "../../../components/Tag";
import Loader from "../../../components/Loader";
import { useGetPostReducer, useUpdatePostReducer } from "../../../../customHooks/postCustomHooks";
import JoditEditor from "jodit-react";
import { textarea_config } from "../../../../config/textareaconfig";
import CategorySearchComboBox from "../../../components/CategorySearchComboBox";
import { useGetCategoryReducer } from "../../../../customHooks/categoryCustomHooks";
import TagSearchComboBox from "../../../components/TagSearchComboBox";

const UpdatePost = () => {

    const { postId } = useParams();

    const { postData, loading } = useGetPostReducer(postId);

    const { Title_Encapsulated, Description_Encapsulated, Content_Encapsulated, Tags_Encapsulated, Category_Encapsulated, updatePost } = useUpdatePostReducer(postId, postData);

    const { categoryLoading, CategoryContent_Encapsulated, FileteredCategories_Encapsulated } = useGetCategoryReducer();

    return categoryLoading && loading ? <Loader /> : (
        <div className='main_content_update_iner overly_inner'>
            <div className="row">
                <div class="col-12">
                    <div class="page_title_box d-flex align-items-center justify-content-between">
                        <div class="page_title_left">
                            <h3 class="f_s_30 f_w_700 text_white">Update Post</h3>
                            <ol class="breadcrumb page_bradcam mb-0">
                                <li class="breadcrumb-item"><a>Admin Panel</a></li>
                                <li class="breadcrumb-item active">Update Post</li>
                            </ol>
                        </div>
                        <CategorySearchComboBox selected={Category_Encapsulated.get} setSelected={Category_Encapsulated.set} categories={FileteredCategories_Encapsulated.get} content={CategoryContent_Encapsulated.get} setContent={CategoryContent_Encapsulated.set} />
                    </div>
                </div>
            </div>
            <div className="update_post_container">
                <div className="update_post_card_container">
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

                    </div>
                </div >

                <div className="update_post_card_container">
                    <TagSearchComboBox setTagsList={Tags_Encapsulated.set} tagsList={Tags_Encapsulated.get} />
                    <div class="tags_field" data-aos="flip-up">
                        {Tags_Encapsulated.get && Tags_Encapsulated.get.map((tag, index) => {
                            return <Tag tagId={tag._id} content={tag.content} tagsList={Tags_Encapsulated.get} setTagsList={Tags_Encapsulated.set} index={index} editable={true}/>
                        })}
                    </div>
                </div>

                < div className="card_actions" >
                    <  i className="fa-solid fa-circle-check" onClick={() => updatePost()}></i>
                </div>

            </div>
        </div >
    );
}

export default UpdatePost








