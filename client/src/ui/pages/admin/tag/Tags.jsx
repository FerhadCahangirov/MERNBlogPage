import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import getToken from '../../../../utils/getToken';
import { useCreateTagReducer, useDeleteTagReducer, useGetTagsReducer, useUpdateTagReducer } from '../../../../customHooks/tagCustomHooks';
import Loader from '../../../components/Loader';


const Tags = () => {

    const { loading, tagsData, handle_NextPage, handle_PrevPage, handle_Pagination, TagContent_Encapsulated, paginationList, Size_Encapsulated, Page_Encapsulated } = useGetTagsReducer();

    return loading ? <Loader /> : (
        <>
            <div className='main_content_iner overly_inner'>
                <div className="row">
                    <div class="col-12">
                        <div class="page_title_box d-flex align-items-center justify-content-between">
                            <div class="page_title_left">
                                <h3 class="f_s_30 f_w_700 text_white">Tags</h3>
                                <ol class="breadcrumb page_bradcam mb-0">
                                    <li class="breadcrumb-item"><a>Admin Panel</a></li>
                                    <li class="breadcrumb-item active">Tags</li>
                                </ol>
                            </div>
                            <a class="white_btn3" data-bs-toggle="modal" data-bs-target="#createModal">Create Tag</a>
                        </div>
                        <div class="filter_box d-flex align-items-center justify-content-between">
                            <div class="search-box">
                                <button class="btn-search"><i class="fas fa-search"></i></button>
                                <input type="text" class="input-search" placeholder="Type to Search..." value={TagContent_Encapsulated.get} onChange={event => TagContent_Encapsulated.set(event.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="task-container">
                    {tagsData && tagsData.tags && tagsData.tags.map((tag, index) => <TagItem tagData={tag} index={index} />)}
                </div>
                <div className="pagination_container">
                    <div className='dataTables_paginate paging_simple_numbers'>
                        <a className="paginate_button previous" style={{ 'pointerEvents': `${Page_Encapsulated.get > 0 ? 'all' : 'none'}` }} onClick={() => handle_PrevPage()} >
                            <i class="fas fa-arrow-left"></i>
                        </a>
                        {
                            paginationList.map(pagination => {
                                console.log("PAGINATION : ", pagination);
                                return (
                                    <a className={`paginate_button ${pagination.isActive && 'current'}`} onClick={() => handle_Pagination(pagination.number, pagination.isActive)}>{pagination.number}</a>
                                );
                            })
                        }
                        <a class="paginate_button next" style={{ 'pointerEvents': `${Page_Encapsulated.get < Math.ceil(tagsData.totalCount / Size_Encapsulated.get) - 1 ? 'all' : 'none'}` }} onClick={() => handle_NextPage()}>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <CreateTagModal />
            {tagsData.tags && tagsData.tags.map((tag, index) => <UpdateTagModal tagId={tag._id} content={tag.content} index={index} />)}
        </>
    );
};

const TagItem = ({ tagData, index }) => {

    const {deleteTag} = useDeleteTagReducer(tagData._id);

    const colors = [
        { primaryColor: "#a972cb", secondaryColor: "#C4B0D0" },
        { primaryColor: "#ef6eae", secondaryColor: "#EDB2CF" },
        { primaryColor: "#ff7f82", secondaryColor: "#FED5D6" },
        { primaryColor: "#ffa260", secondaryColor: "#FEE5D3" },
        { primaryColor: "#e4cb58", secondaryColor: "#E6DDB7" },
        { primaryColor: "#8fc866", secondaryColor: "#B0C4A1" },
        { primaryColor: "#19bc8b", secondaryColor: "#9CBFB5" },
        { primaryColor: "#40B5E1", secondaryColor: "#A3CFE0" },
        { primaryColor: "#504DFF", secondaryColor: "#BAB9FE" },
    ]
    
    return (
        <>
            <div class="card-wrapper mr-5">
                <div class="card-top" style={{ "background-color": colors[index % colors.length].primaryColor }}></div>
                <div class="task-holder">
                    <span class="card-header" style={{ "background-color": colors[index % colors.length].secondaryColor, "border-radius": "10px" }}>{tagData.content}</span>

                    <div style={{ "position": "absolute", "right": "20px", "bottom": "20px" }}>
                        <i class="far fa-edit" style={{ "color": colors[index % colors.length].primaryColor, "cursor": "pointer" }} data-bs-toggle="modal" data-bs-target={`#updateModal${index}`}></i>
                        <i class="fas fa-trash-alt" style={{ "color": colors[index % colors.length].primaryColor, "cursor": "pointer" }} onClick={() => deleteTag()}></i>
                    </div>
                </div>
            </div>
        </>
    );
};

const CreateTagModal = () => {

    const { TagContent_Encapsulated, createTag } = useCreateTagReducer();

    return (
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div className="create_tag_container">
                        <div className="field field_v1">
                            <label className="ha-screen-reader">Tag Content</label>
                            <input id="first-name" className="field__input" placeholder="e.g. Stanislav" value={TagContent_Encapsulated.get} onChange={event => TagContent_Encapsulated.set(event.target.value)} />
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Tag Content</span>
                            </span>
                        </div>
                    </div>
                    <div className="button_field">
                        <a data-bs-dismiss="modal"><i className='fas fa-close'></i></a>
                        <a onClick={() => createTag()}><i className='fas fa-plus'></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const UpdateTagModal = ({ content, index, tagId }) => {
    const { updateTag, TagContent_Encapsulated } = useUpdateTagReducer(content, tagId);

    return (
        <div class="modal fade" id={`updateModal${index}`} tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div className="create_tag_container">
                        <div className="field field_v1">
                            <label className="ha-screen-reader">Tag Content</label>
                            <input id="first-name" className="field__input" placeholder="e.g. Stanislav" value={TagContent_Encapsulated.get} onChange={event => TagContent_Encapsulated.set(event.target.value)} />
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Tag Content</span>
                            </span>
                        </div>
                    </div>
                    <div className="button_field">
                        <a data-bs-dismiss="modal"><i className='fas fa-close'></i></a>
                        <a onClick={() => updateTag()}><i className='fas fa-plus'></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tags;