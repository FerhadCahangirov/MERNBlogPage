import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import getToken from '../../../../utils/getToken'
import Comments from './Comments'
import { UserContext } from '../../../../contexts/userContext'
import { formatDate } from '../../../../utils/formatDate'
import parse from 'html-react-parser';


function Single() {
    const { postId } = useParams();
    const [data, setData] = useState(null);
    const [userData, setUserData] = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const postLikeButtonRef = useRef();
    const isEmpty = (obj) => {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }
    useEffect(() => {
        if (isEmpty(userData)) setIsLoggedIn(false);
        else setIsLoggedIn(true);
    }, [userData, isLoggedIn]);
    useEffect(() => {
        const TOKEN = getToken();
        const requestOptions = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` }, credentials: 'include', };
        fetch(`http://localhost:8080/posts/find/${postId}`, requestOptions)
            .then((response) => response.json())
            .then((response) => setData(response))
            .catch((error) => console.log(error));
    }, []);
    const _createdDate = formatDate(data && data.createdDate);
    const likePost = (_id) => {
        const TOKEN = getToken();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
            credentials: 'include',
        };
        const likeBtn = postLikeButtonRef.current;
        fetch(`http://localhost:8080/posts/likepost/${_id}`, requestOptions).then(response => response.json()).then(response => {
            if (response.success === true) {
                if (response.message === "liked") {
                    likeBtn.classList.add('active');
                    likeBtn.innerHTML = `<i class="fa-solid fa-heart"></i>  ${parseInt(likeBtn.textContent) + 1}`;
                } else if (response.message === "unliked") {
                    likeBtn.classList.remove('active');
                    likeBtn.innerHTML = `<i class="fa-solid fa-heart"></i>  ${parseInt(likeBtn.textContent) - 1}`;
                }
            }
            else {
                if (response.message === 'unauthorized')
                    Swal.fire({
                        title: 'You are not authorized!',
                        text: "Do you want to sign in?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, login!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/login';
                        }
                    });
            }
            console.log(response)
        }).catch(err => console.log(err));
    }

    return (
        <div className="single is-preload">
            <img className="image featured" src={data && data.imageUrl} />
            <div className="bg"></div>
            <header>
                <a href="#" className="brand" data-aos="fade-right" data-aos-delay="300">BEST</a>
                <div className="menu-btn" data-aos="fade-left" data-aos-delay="300"></div>
                <div className="navigation" data-aos="fade-left" data-aos-delay="300">
                    <div className="navigation-items">
                        <a href="/">Home</a>
                        <a href="#">About</a>
                        <a href="#">Services</a>
                        <a href="#">Portfolio</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
                <div className="actions">
                    <div className="actions-nav">
                        <a href="#"><i class="fa-solid fa-right-to-bracket"></i></a>
                        <a href="#"><i class="fa-solid fa-gear"></i></a>
                    </div>
                </div>
            </header>

            <section className='header'>
                <div className="title">
                    <h2><a href="#">{data && data.title}</a></h2>
                    <div className="left_side">
                        <time><i className='fas fa-calendar-alt'></i>{_createdDate}</time>
                        <ul className="stats">
                            <li><a href="#">Stats</a></li>
                            <li><a ref={postLikeButtonRef} className={`${data && data.liked && 'active'}`} onClick={() => likePost(data && data._id)}><i className="fa-solid fa-heart"></i>  {data && data.totalLikesCount}</a></li>
                            <li><a><i class="fa-solid fa-comment"></i> {data && data.totalCommentsCount}</a></li>
                        </ul>
                    </div>
                </div>
            </section>


            {/* <!-- Post --> */}
            <article className="post row">


                <div className="content_container col-md-9">
                    <p>&emsp;&emsp;&emsp;&emsp;{data && data.description}</p>
                    { data && data.content && parse(data.content)}
                </div>

                <div className="sidebar_container col-md-3">
                    <div class="category">
                        <h2>Category</h2>

                        <ul>
                            <li data-aos="fade-left" data-aos-delay="100">
                                <a href="#">Software</a>
                                <span>(05)</span>
                            </li>
                        </ul>
                    </div>
                    <div class="popular-post">
                        <h2>Related Post</h2>
                        <div class="post-content aos-init" data-aos="flip-up" data-aos-delay="200">
                            <div class="post-image">
                                <div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" class="img" alt="blog1" />
                                </div>
                                <div class="post-info flex-row">
                                    <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14,
                                        2019</span>&nbsp;&nbsp;
                                    <span>2 <i className="fa-regular fa-comments"></i> 5 <i className="fa-regular fa-heart"></i></span>
                                </div>
                            </div>
                            <div class="post-title">
                                <a href="#">New data recording system to better analyse road accidents</a>
                            </div>
                        </div>
                        <div class="post-content aos-init" data-aos="flip-up" data-aos-delay="300">
                            <div class="post-image">
                                <div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" class="img" alt="blog1" />
                                </div>
                                <div class="post-info flex-row">
                                    <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14,
                                        2019</span>&nbsp;&nbsp;
                                    <span>2 <i className="fa-regular fa-comments"></i> 5 <i className="fa-regular fa-heart"></i></span>
                                </div>
                            </div>
                            <div class="post-title">
                                <a href="#">New data recording system to better analyse road accidents</a>
                            </div>
                        </div>
                        <div class="post-content aos-init" data-aos="flip-up" data-aos-delay="400">
                            <div class="post-image">
                                <div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" class="img" alt="blog1" />
                                </div>
                                <div class="post-info flex-row">
                                    <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14,
                                        2019</span>&nbsp;&nbsp;
                                    <span>2 <i className="fa-regular fa-comments"></i> 5 <i className="fa-regular fa-heart"></i></span>
                                </div>
                            </div>
                            <div class="post-title">
                                <a href="#">New data recording system to better analyse road accidents</a>
                            </div>
                        </div>

                    </div>
                    <div class="popular-tags">
                        <h2>Popular Tags</h2>
                        <div class="tags flex-row" data-aos="flip-up" >
                            <a href="/tags/javascript/" ><span class="tag  tag-lg"><i class="fa-solid fa-tag"></i>javascript </span></a>

                            <a href="/tags/security/"><span class="tag  tag-lg"><i class="fa-solid fa-tag"></i>security</span></a>

                            <a href="/tags/firebase/"><span class="tag tag-firebase tag-lg"><i class="fa-solid fa-tag"></i>firebase</span></a>

                            <a href="/tags/firestore/"><span class="tag tag-firestore tag-lg"><i class="fa-solid fa-tag"></i>firestore</span></a>

                            <a href="/tags/auth/"><span class="tag tag-auth tag-lg"><i class="fa-solid fa-tag"></i>auth</span></a>

                            <a href="/tags/ios/"><span class="tag tag-ios tag-lg"><i class="fa-solid fa-tag"></i>ios</span></a>

                            <a href="/tags/angular/"><span class="tag tag-angular tag-lg"><i class="fa-solid fa-tag"></i>angular</span></a>

                            <a href="/tags/react/"><span class="tag tag-react tag-lg"><i class="fa-solid fa-tag"></i>react</span></a>
                        </div>
                    </div>
                </div>
            </article>

            {data && <Comments comments={data.comments} postId={data._id} isLoggedIn={isLoggedIn} />}


            <footer class="footer">
                <div class="container">
                    <div class="about-us" data-aos="fade-right" data-aos-delay="200">
                        <h2>About us</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quia atque nemo ad modi officiis
                            iure, autem nulla tenetur repellendus.</p>
                    </div>
                    <div class="instagram" data-aos="fade-left" data-aos-delay="200">
                        <h2>Instagram</h2>
                        <div class="flex-row">
                            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9_sjKQ5G8DREps8geX0Yyg0N9Ypgk84tfaPJsp0fK&s" />
                            <img src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg" />
                        </div>
                        <div class="flex-row">
                            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9_sjKQ5G8DREps8geX0Yyg0N9Ypgk84tfaPJsp0fK&s" />
                            <img src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div></div>
                    <div class="follow" data-aos="fade-left" data-aos-delay="200">
                        <h2>Follow us</h2>
                        <p>Let us be Social</p>
                        <div>
                            <i class="fab fa-facebook-f"></i>
                            <i class="fab fa-twitter"></i>
                            <i class="fab fa-instagram"></i>
                            <i class="fab fa-youtube"></i>
                        </div>
                    </div>
                </div>
                <div class="rights">
                    <h4 class="text-gray">
                        Copyright ©2019 All rights reserved | made by Ferhad Cahangirov
                    </h4>
                </div>
                <div class="move-up">
                    <span><i class="fas fa-arrow-circle-up fa-2x"></i></span>
                </div>
            </footer>

        </div>
    )
}

export default Single



