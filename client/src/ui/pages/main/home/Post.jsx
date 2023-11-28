import React, { useRef } from 'react';
import { useLikePostReducer } from '../../../../customHooks/postCustomHooks';
import { formatDate } from '../../../../utils/formatDate';

function Post({ id, title, description, createdDate, imageUrl, totalCommentsCount, likes, liked }) {

    const formattedDate = formatDate(createdDate);
    const postLikeButtonRef = useRef(null);
    const { likePost } = useLikePostReducer(postLikeButtonRef);

    return (
        <article class="postcard light blue" data-aos="zoom-in-up">
            <a class="postcard__img_link" href="#">
                <img class="postcard__img" src={imageUrl} alt="Image Title" />
            </a>
            <div class="postcard__text t-dark">
                <h1 class="postcard__title blue"><a href="#">{title}</a></h1>
                <div class="postcard__subtitle small">
                    <time>
                        <i class="fas fa-calendar-alt mr-2"></i>{formattedDate}
                    </time>
                </div>
                <div class="postcard__bar"></div>
                <div class="postcard__preview-txt">{description.length > 200 ? `${description.slice(0, 200)}...` : description}</div>
                <ul class="postcard__tagbox">
                    <li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
                    <li class="tag__item"><i class="fas fa-comment mr-2"></i>{totalCommentsCount} </li>
                    <li
                        class={`tag__item ${liked && 'active'}`}
                        ref={postLikeButtonRef}
                        onClick={() => likePost(id)}
                    ><i class="fas fa-heart mr-2"></i>
                        {likes}
                    </li>

                    <li class="tag__item play blue">
                        <a href={`single/${id}`}><i class="fas fa-play mr-2"></i>Read More</a>
                    </li>
                </ul>
            </div>
        </article>
    )
}

export default Post