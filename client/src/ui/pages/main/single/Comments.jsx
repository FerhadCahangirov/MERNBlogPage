import React, { useRef, useState } from 'react';
import unknownuser from '../../../../static/files/icons/unknown.png';
import Swal from 'sweetalert2';
import getToken from '../../../../utils/getToken';


const Comments = ({ comments, postId, isLoggedIn }) => {

    const callLogIn_Swal = () => {
        Swal.fire({
            title: 'You are not authorized!',
            text: "Do you want to sign in?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, login!',
        }).then((result) => {
            if (result.isConfirmed) { window.location.href = '/login'; }
        });
    }
    const onComment = (content) => {
        if (content === '')
            Swal.fire({ icon: 'warning', title: 'Please fill the comment box...!' });
        else {
            const TOKEN = getToken();
            const requestOptions = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` }, credentials: 'include', 'body': JSON.stringify({ content: content }) };
            fetch(`http://localhost:8080/posts/comments/${postId}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    if (response.success) window.location.reload();
                }).catch(error => console.log(error));
        }
    }
    return (
        <section className='comments_container'>
            <div className="share_panel">
                {
                    isLoggedIn ? <CommentInput onComment={onComment} /> : (
                        <div className='login_field'>
                            <a onClick={() => callLogIn_Swal()}><i class="fa-solid fa-right-to-bracket"></i> Log in for sending comment...</a>
                        </div>
                    )
                }
            </div>

            <div className='panel'>
                <div className="panel-body">
                    {comments && comments.map(comment => (
                        <CommentItem commentData={comment} postId={postId} isLoggedIn={isLoggedIn} callLogIn_Swal={callLogIn_Swal} />
                    ))}
                </div>
            </div>
        </section>
    )
}
const CommentInput = ({ onComment }) => {
    const [commentBody, setCommentBody] = useState('');
    return (
        <div className='share_field'>
            <input
                placeholder='What are you thinking...'
                value={commentBody}
                onChange={event => setCommentBody(event.target.value)} />
            <a
                onClick={() => onComment(commentBody)}
            ><i className='fas fa-pen' ></i> Share</a>
        </div>
    )
}
const CommentItem = ({ commentData, postId, isLoggedIn, callLogIn_Swal }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [showNestedComments, setShowNestedComments] = useState(false);
    const likeButtonRef = useRef(null);
    const providedDate = new Date(commentData.comment.createdDate);
    const currentDate = new Date();
    const timeDifferenceMs = currentDate - providedDate;
    const secondsAgo = Math.round(timeDifferenceMs / 1000);
    const minutesAgo = Math.round(secondsAgo / 60);
    const hoursAgo = Math.round(minutesAgo / 60);
    const daysAgo = Math.round(hoursAgo / 24);
    const weeksAgo = Math.round(daysAgo / 7);
    const monthsAgo = Math.round(currentDate.getMonth() - providedDate.getMonth() + (12 * (currentDate.getFullYear() - providedDate.getFullYear())));
    const yearsAgo = Math.round(currentDate.getFullYear() - providedDate.getFullYear());
    const _formattedDateString = secondsAgo < 60 ? `${secondsAgo} seconds ago` : minutesAgo < 60 ? `${minutesAgo} minutes ago` : hoursAgo < 24 ? `${hoursAgo} hours ago` : daysAgo < 7 ? `${daysAgo} days ago` : weeksAgo < 4 ? `${weeksAgo} weeks ago` : monthsAgo < 12 ? `${monthsAgo} months ago` : `${yearsAgo} years ago`;
    const onComment = (content) => {
        if (content === '') {
            Swal.fire({ icon: 'warning', title: 'Please fill the comment box...!' });
        } else {
            const TOKEN = getToken();
            const requestOptions = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` }, credentials: 'include', 'body': JSON.stringify({ content: content }) };
            fetch(`http://localhost:8080/posts/replycomments/${postId}/${commentData.comment._id}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        window.location.reload();
                    }
                }).catch(error => console.log(error.message, error.stack))
        }
    };
    const likeComment = (_postId, _commentId) => {
        if (isLoggedIn) {
            const TOKEN = getToken();
            const requestOptions = {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` }, credentials: 'include',
            };
            const likeBtn = likeButtonRef.current;
            fetch(`http://localhost:8080/posts/comments/likecomment/${_postId}/${_commentId}`, requestOptions).then(response => response.json())
                .then(response => {
                    if (response.success === true) {
                        if (response.message == 'liked') {
                            likeBtn.classList.add('active');
                            likeBtn.innerHTML = `<i class="fa fa-heart"></i>  ${parseInt(likeBtn.textContent) + 1}`;
                        }
                        else if (response.message == 'unliked') {
                            likeBtn.classList.remove('active');
                            likeBtn.innerHTML = `<i class="fa fa-heart"></i>  ${parseInt(likeBtn.textContent) - 1}`;
                        }
                    }
                })
                .catch(error => console.log(error));
        } else callLogIn_Swal();
    }
    return (
        <div className="comment-block">
            <a class="comment-left" href="#"><img class="img-circle img-sm" alt="Profile Picture"
                src={commentData.user.profileImageUrl ? commentData.user.profileImageUrl : unknownuser} /></a>
            <div class="comment-body">
                <div class="user-credentials">
                    <a class="">{commentData.user.username}</a>
                    <p className='text-sm text-muted'>&emsp;-&emsp;{commentData.user.fullname}</p>
                    <time class="text-muted text-sm">&emsp;-&emsp;{_formattedDateString}</time>
                </div>
                <p>{commentData.comment.content}</p>
                <div class="comment-actions">
                    <a ref={likeButtonRef} onClick={() => likeComment(postId, commentData.comment._id)} className={`${commentData.comment.liked && 'active'}`}><i class="fa fa-heart"></i> {commentData.comment.likes}</a>
                    <a onClick={() => isLoggedIn ? setIsReplying(prev => !prev) : callLogIn_Swal()}>{`${isReplying ? 'cancel' : 'reply'}`}</a>
                    {
                        commentData.comment.replyComments.length !== 0 && <a onClick={() => setShowNestedComments(prev => !prev)}><i className={`fa-solid fa-arrow-up-from-bracket ${!showNestedComments && 'fa-rotate-180'}`}></i></a>
                    }
                </div>
                {isReplying && <CommentInput onComment={onComment} />}
                <hr />
                {
                    showNestedComments && <div>
                        {commentData.comment.replyComments.map(replyComment => {
                            return (<NestedCommentsItem commentData={replyComment} postId={postId} commentId={commentData.comment._id} isLoggedIn={isLoggedIn} callLogIn_Swal={callLogIn_Swal} />)
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

const NestedCommentsItem = ({ commentData, postId, commentId, isLoggedIn, callLogIn_Swal }) => {
    const [isReplying, setIsReplying] = useState(false);
    const likeButtonRef = useRef(null);
    const onComment = (content) => {
        if (content === '') {
            Swal.fire({ icon: 'warning', title: 'Please fill the comment box...!' });
        } else {
            const TOKEN = getToken();
            const requestOptions = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` }, credentials: 'include', 'body': JSON.stringify({ content: `@${commentData.user.username} ${content}` }) };
            fetch(`http://localhost:8080/posts/replycomments/${postId}/${commentId}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        window.location.reload();
                    }
                }).catch(error => console.log(error.message, error.stack))
        }
    }
    const likeReplyComment = (_postId, _commentId, _replyCommentId) => {
        if (isLoggedIn) {
            const TOKEN = getToken();
            const requestOptions = {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` }, credentials: 'include',
            };
            const likeBtn = likeButtonRef.current;
            fetch(`http://localhost:8080/posts/comments/likereplycomment/${_postId}/${_commentId}/${_replyCommentId}`, requestOptions).then(response => response.json())
                .then(response => {
                    if (response.success === true) {
                        if (response.message === 'liked') {
                            likeBtn.classList.add('active');
                            likeBtn.innerHTML = `<i class="fa fa-heart"></i> ${parseInt(likeBtn.textContent) + 1}`;
                        }
                        else if (response.message === 'unliked') {
                            likeBtn.classList.remove('active');
                            likeBtn.innerHTML = `<i class="fa fa-heart"></i> ${parseInt(likeBtn.textContent) - 1}`;
                        }
                    }
                })
                .catch(error => console.log(error));
        }
        else callLogIn_Swal();
    }
    const providedDate = new Date(commentData.replyComment.createdDate);
    const currentDate = new Date();
    const timeDifferenceMs = currentDate - providedDate;
    const secondsAgo = Math.round(timeDifferenceMs / 1000);
    const minutesAgo = Math.round(secondsAgo / 60);
    const hoursAgo = Math.round(minutesAgo / 60);
    const daysAgo = Math.round(hoursAgo / 24);
    const weeksAgo = Math.round(daysAgo / 7);
    const monthsAgo = Math.round(currentDate.getMonth() - providedDate.getMonth() + (12 * (currentDate.getFullYear() - providedDate.getFullYear())));
    const yearsAgo = Math.round(currentDate.getFullYear() - providedDate.getFullYear());

    const _formattedDateString = secondsAgo < 60 ? `${secondsAgo} seconds ago` : minutesAgo < 60 ? `${minutesAgo} minutes ago` : hoursAgo < 24 ? `${hoursAgo} hours ago` : daysAgo < 7 ? `${daysAgo} days ago` : weeksAgo < 4 ? `${weeksAgo} weeks ago` : monthsAgo < 12 ? `${monthsAgo} months ago` : `${yearsAgo} years ago`;

    return (
        <div className="comment-block">
            <a class="comment-left" href="#"><img class="img-circle img-sm" alt="Profile Picture"
                src={commentData.user.profileImageUrl ? commentData.user.profileImageUrl : unknownuser} /></a>
            <div class="comment-body">
                <div class="user-credentials">
                    <a>{commentData.user.username}</a>
                    <p className='text-sm text-muted'>&emsp;-&emsp;{commentData.user.fullname}</p>
                    <time class="text-muted text-sm">&emsp;-&emsp;{_formattedDateString}</time>
                </div>
                <p>{commentData.replyComment.content}</p>
                <div class="comment-actions">
                    <a ref={likeButtonRef} className={`${commentData.replyComment.liked && 'active'}`} onClick={() => likeReplyComment(postId, commentId, commentData.replyComment._id)}><i class="fa fa-heart"></i> {commentData.replyComment.likes}</a>
                    <a class="" onClick={() => isLoggedIn ? setIsReplying(prev => !prev) : callLogIn_Swal()}>{`${isReplying ? 'cancel' : 'reply'}`}</a>
                </div>
                {isReplying && <CommentInput onComment={onComment} />}
                <hr />
            </div>
        </div>
    )
}

export default Comments