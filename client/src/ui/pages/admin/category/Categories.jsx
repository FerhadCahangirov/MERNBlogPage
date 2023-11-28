import React, { useEffect, useState } from 'react'
import getToken from '../../../../utils/getToken';
import Swal from 'sweetalert2';
import { useCreateCategoryReducer, useDeleteCategoryReducer, useGetCategoryReducer, useUpdateCategoryReducer } from '../../../../customHooks/categoryCustomHooks';
import Loader from '../../../components/Loader';

const Categories = () => {

    const { categoryLoading, FileteredCategories_Encapsulated, CategoryContent_Encapsulated } = useGetCategoryReducer();

    return categoryLoading ? <Loader /> : (
        <>
            <div className='main_content_iner overly_inner'>
                <div className="row">
                    <div class="col-12">
                        <div class="page_title_box d-flex align-items-center justify-content-between">
                            <div class="page_title_left">
                                <h3 class="f_s_30 f_w_700 text_white">Categories</h3>
                                <ol class="breadcrumb page_bradcam mb-0">
                                    <li class="breadcrumb-item"><a>Admin Panel</a></li>
                                    <li class="breadcrumb-item active">Categories</li>
                                </ol>
                            </div>
                            <a class="white_btn3" data-bs-toggle="modal" data-bs-target="#createModal">Create Category</a>
                        </div>
                        <div class="filter_box d-flex align-items-center justify-content-between">
                            <div class="search-box">
                                <button class="btn-search"><i class="fas fa-search"></i></button>
                                <input type="text" class="input-search" placeholder="Type to Search..."
                                    value={CategoryContent_Encapsulated.get}
                                    onChange={event => CategoryContent_Encapsulated.set(event.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="categories-responsive categories-table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th scope='col'>Id</th>
                                <th scope='col'>Category</th>
                                <th scope="col">Post List</th>
                                <th scope="col">View Posts</th>
                                <th scope="col">Edit</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FileteredCategories_Encapsulated.get.map((categoryData, index) => {
                                return <Category categoryData={categoryData} index={index} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <CreateCategory />
            {FileteredCategories_Encapsulated.get.map((categoryData, index) => {
                return <UpdateCategory categoryId={categoryData.category._id} content={categoryData.category.content} index={index} />
            })}
        </>
    )
}

const Category = ({ categoryData, index }) => {

    const { deleteCategory } = useDeleteCategoryReducer(categoryData.category._id)

    return (
        <>
            <tr scope="row">
                <th>{categoryData.category._id}</th>
                <th>{categoryData.category.content}</th>
                <th>({categoryData.postsCount})</th>
                <th><i className='fas fa-eye'></i></th>
                <th data-bs-toggle="modal" data-bs-target={`#updateModal${index}`}><i className='fas fa-edit'></i></th>
                <th><i className='fas fa-trash' onClick={() => deleteCategory()}></i></th>
            </tr>
            <tr className="spacer"><td colspan="100"></td></tr>
        </>
    );
}

const CreateCategory = () => {

    const { CategoryContent_Encapsulated, createCategory } = useCreateCategoryReducer();

    return (
        <div class="modal fade" id="createModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div className="create_tag_container">
                        <div className="field field_v1">
                            <label className="ha-screen-reader">Category Content</label>
                            <input id="first-name" className="field__input" placeholder="e.g. Stanislav"
                                value={CategoryContent_Encapsulated.get}
                                onChange={event => CategoryContent_Encapsulated.set(event.target.value)} />
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Category Content</span>
                            </span>
                        </div>
                    </div>
                    <div className="button_field">
                        <a data-bs-dismiss="modal"><i className='fas fa-close'></i></a>
                        <a onClick={() => createCategory()}><i className='fas fa-plus'></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const UpdateCategory = ({ content, index, categoryId }) => {
    const { updateCategory, CategoryContent_Encapsulated } = useUpdateCategoryReducer(content, categoryId);
    return (
        <div class="modal fade" id={`updateModal${index}`} tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div className="create_tag_container">
                        <div className="field field_v1">
                            <label className="ha-screen-reader">Category Content</label>
                            <input id="first-name" className="field__input" placeholder="e.g. Stanislav"
                                value={CategoryContent_Encapsulated.get}
                                onChange={event => CategoryContent_Encapsulated.set(event.target.value)} />
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Category Content</span>
                            </span>
                        </div>
                    </div>
                    <div className="button_field">
                        <a data-bs-dismiss="modal"><i className='fas fa-close'></i></a>
                        <a onClick={() => updateCategory()}><i className='fas fa-plus'></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories