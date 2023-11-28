import React from 'react';
import { useGetPostsReducer } from '../../../../customHooks/postCustomHooks';
import Loader from '../../../components/Loader';
import Post from './Post';

const Postsbar = () => {

    const { postsData, loading, handle_PrevPage, handle_NextPage, handle_Pagination, Page_Encapsulated, Size_Encapsulated } = useGetPostsReducer();
    
    return loading ? <Loader/> : (
        <div class="postcard_container col-md-9">
            {/* Posts */}

            {postsData && postsData.posts && postsData.posts.map(data => {
                return <Post id={data._id} title={data.title} description={data.description} createdDate={data.createdDate} imageUrl={data.imageUrl} totalCommentsCount={data.totalCommentsCount} likes={data.totalLikesCount} liked={data.liked} />
            })
            }

            {/* <!-- Pagination --> */}

            <ul className="actions pagination">
                <li><a className={` ${Page_Encapsulated.get <= 0 && 'disabled'} button large previous`} onClick={() => handle_PrevPage()}>Previous Page</a></li>
                <li><a className={` ${Page_Encapsulated.get >= Size_Encapsulated.get && 'disabled'} button large next`} onClick={() => handle_NextPage()}>Next Page</a></li>
            </ul>

        </div>
    )
}

export default Postsbar