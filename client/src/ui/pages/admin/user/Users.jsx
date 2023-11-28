import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDeleteUserReducer, useGetUsersReducer } from '../../../../customHooks/userCustomHooks';
import Loader from '../../../components/Loader';


function Users() {

    const { usersData, errorData, error, loading, paginationList, Content_Encapsulated, handle_PrevPage, handle_NextPage, handle_Pagination, Page_Encapsulated, Size_Encapsulated } = useGetUsersReducer();

    return loading ? <Loader /> : (
        <div className="content">
            <div className="container">
                <div className="table-header">
                    <h2>Users</h2>
                </div>
                <div className="user_search_container">
                    <div class="user_search_container_wrapper">
                        <input class="user_search_input" type="text" placeholder='Search for user... '
                            value={Content_Encapsulated.get}
                            onChange={event => Content_Encapsulated.set(event.target.value)}
                        />
                        <i class="user_search_input_icon fa fa-search"></i>
                    </div>
                </div>

                <div className="table-responsive custom-table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th scope='col'>Id</th>
                                <th scope="col">Fullname</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope='col'>Delete</th>
                                <th scope='col'>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData && usersData.users && usersData.users.map(user => <User user={user} />)}
                        </tbody>
                    </table>
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
                        <a class="paginate_button next" style={{ 'pointerEvents': `${Page_Encapsulated.get < Math.ceil(usersData.totalCount / Size_Encapsulated.get) - 1 ? 'all' : 'none'}` }} onClick={() => handle_NextPage()}>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const User = ({ user }) => {

    const { deleteuser } = useDeleteUserReducer(user._id);

    return (
        <>
            <tr scope="row">
                <th scope="row">
                    <img src="" className='table-img' />
                </th>
                <td>{user._id}</td>
                <td>
                    {user.fullname}
                </td>
                <td><a href="#">{user.username}</a></td>
                <td><a href='#'>{user.email}</a></td>
                <td><a href='#' onClick={() => deleteuser()}><i class="fa-solid fa-trash"></i></a></td>
                <td><a href='#'><i class="fas fa-eye"></i></a></td>
            </tr>
            <tr className="spacer"><td colspan="100"></td></tr>
        </>
    )
}


export default Users