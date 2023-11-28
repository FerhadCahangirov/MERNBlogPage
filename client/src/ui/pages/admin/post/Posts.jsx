import Loader from '../../../components/Loader';
import { useDeletePostReducer, useGetPostsReducer, useUpdatePostReducer } from "../../../../customHooks/postCustomHooks";
import { formatDate } from '../../../../utils/formatDate';
import { fileInput } from "../../../../utils/fileInput";
import Tag from '../../../components/Tag';

const Post = (props) => {
    const { _id, title, description, imageUrl, createdDate, likesCount, commentsCount, tags, category } = props;

    const _createdDate = formatDate(createdDate);

    const { uploadFile, removeFile } = useUpdatePostReducer(_id);

    const upload = async () => fileInput(uploadFile);
    
    const { deletePost } = useDeletePostReducer(_id);

    return (

        <>
            <div class="col-lg-6">
                <div class="card_box position-relative">
                    <div class="white_box_title ">
                        <div class="main-title2 ">
                            <h4 class="mb-2 nowrap ">{title}</h4>
                            <div className="row-heading">
                                <time>{category.content} </time>
                                <time>posted at {_createdDate} </time>
                            </div>
                        </div>
                    </div>

                    <div class="box_body">
                        <img src={imageUrl} className="card-img img-fluid" alt="Image" />

                        <div className="row">
                            <div className="col-11 box-body-content">
                                <div>
                                    <p className="card-text">{description}</p>
                                </div>
                                <div>
                                    <time><a href="#">likes: {likesCount}</a> | <a href={`postcomments/${_id}`}>comments: {commentsCount}</a></time>
                                </div>
                            </div>
                            <div className="col-1">
                                <div className={`row card_attributes`}>
                                    <a href={`/admin/post/${_id}`} className="m-2"><i class="fa-solid fa-eye"></i></a>
                                    <a className="m-2" onClick={() => deletePost()}><i className="fa-solid fa-trash "></i></a>
                                    <a className="m-2" href={`/admin/updatepost/${_id}`}><i className="fa-solid fa-pen-to-square "></i></a>
                                    {!imageUrl ? <a className="m-2" onClick={() => upload()}><i class="fa-solid fa-image"></i></a> : <a className="m-2" onClick={() => removeFile()}><i class="fa-solid fa-ban"></i></a>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card_footer">
                        <div class="tags_field">
                            {tags.map((tag, index) => {
                                return <Tag tagId={tag._id} content={tag.content} index={index} editable={false} />
                            })}
                        </div>
                    </div>

                </div>

            </div>

        </>
    );
};

const Posts = () => {

    const { postsData, loading, paginationList, Content_Encapsulated, handle_PrevPage, handle_NextPage, handle_Pagination, Page_Encapsulated, Size_Encapsulated } = useGetPostsReducer();

    return loading ? <Loader /> : (
        <>
            <div className='main_content_iner overly_inner'>
                <div className="row">
                    <div class="col-12">
                        <div class="page_title_box d-flex align-items-center justify-content-between">
                            <div class="page_title_left">
                                <h3 class="f_s_30 f_w_700 text_white">Posts</h3>
                                <ol class="breadcrumb page_bradcam mb-0">
                                    <li class="breadcrumb-item"><a>Admin Panel</a></li>
                                    <li class="breadcrumb-item active">Posts</li>
                                </ol>
                            </div>
                            <a href="/admin/createpost" class="white_btn3">Create Post</a>
                        </div>
                        <div class="filter_box d-flex align-items-center justify-content-between">
                            <div class="search-box">
                                <button class="btn-search"><i class="fas fa-search"></i></button>
                                <input type="text" class="input-search" placeholder="Type to Search..."
                                    value={Content_Encapsulated.get}
                                    onChange={event => Content_Encapsulated.set(event.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">

                    {postsData && postsData.posts && postsData.posts.map(data => {
                        return <Post _id={data._id} title={data.title} description={data.description.length > 150 ? `${data.description.slice(0, 150)}...` : data.description} imageUrl={data.imageUrl} createdDate={data.createdDate} likesCount={data.totalLikesCount} commentsCount={data.totalCommentsCount} tags={data.tags} category={data.category} />;
                    })}
                </div>
                <div className="pagination_field">
                    <nav class="pagination-outer" aria-label="Page navigation">
                        <div class="page-item">
                            <a class="page-link" aria-label="Previous"
                                style={{ 'pointerEvents': `${Page_Encapsulated.get > 0 ? 'all' : 'none'}` }}
                                onClick={() => handle_PrevPage()} >
                                <span aria-hidden="true">«</span>
                            </a>
                        </div>
                        <ul class="pagination">
                            {paginationList && paginationList.map(pagination => {
                                return (
                                    <li className={`page-item ${pagination.isActive && 'active'}`}
                                        onClick={() => handle_Pagination(pagination.number, pagination.isActive)}>
                                        <a class="page-link">{pagination.number}</a>
                                    </li>
                                );
                            })}
                        </ul>
                        <div class="page-item">
                            <a class="page-link" aria-label="Next" style={{ 'pointerEvents': `${Page_Encapsulated.get < Math.ceil(postsData.totalCount / Size_Encapsulated.get) - 1 ? 'all' : 'none'}` }} onClick={() => handle_NextPage()}>
                                <span aria-hidden="true" >»</span>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default Posts;

