const Sidebar = () => {
    return (
        <aside className="sidebar col-md-3">
            <div class="category">
                <h2>Category</h2>

                <div className="categorySearchContainer">
                    <div class="categorySearchInputWrapper">
                        <input class="categorySearchInput" type="text" placeholder='Search for category... ' />
                        <i class="categorySearchInputIcon fa fa-search"></i>
                    </div>
                </div>

                <ul class="category-list">
                    <li class="list-items aos-init aos-animate" data-aos="fade-left" data-aos-delay="100">
                        <a href="#">Software</a>
                        <span>(05)</span>
                    </li>
                    <li class="list-items aos-init aos-animate" data-aos="fade-left" data-aos-delay="200">
                        <a href="#">Techonlogy</a>
                        <span>(02)</span>
                    </li>
                    <li class="list-items aos-init aos-animate" data-aos="fade-left" data-aos-delay="300">
                        <a href="#">Lifestyle</a>
                        <span>(07)</span>
                    </li>
                    <li class="list-items aos-init aos-animate" data-aos="fade-left" data-aos-delay="400">
                        <a href="#">Shopping</a>
                        <span>(01)</span>
                    </li>
                    <li class="list-items aos-init aos-animate" data-aos="fade-left" data-aos-delay="500">
                        <a href="#">Food</a>
                        <span>(08)</span>
                    </li>
                </ul>
            </div>
            <div class="popular-post">
                <h2>Popular Post</h2>
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

            </div>
            <div class="popular-tags">
                <h2>Popular Tags</h2>
                <div class="tags flex-row" data-aos="flip-up" >

                    <a href="/tags/security/"><span class="tag  tag-lg"><i class="fa-solid fa-tag"></i>security</span></a>

                    <a href="/tags/firebase/"><span class="tag tag-firebase tag-lg"><i class="fa-solid fa-tag"></i>firebase</span></a>

                    <a href="/tags/firestore/"><span class="tag tag-firestore tag-lg"><i class="fa-solid fa-tag"></i>firestore</span></a>

                    <a href="/tags/auth/"><span class="tag tag-auth tag-lg"><i class="fa-solid fa-tag"></i>auth</span></a>

                    <a href="/tags/ios/"><span class="tag tag-ios tag-lg"><i class="fa-solid fa-tag"></i>ios</span></a>

                    <a href="/tags/angular/"><span class="tag tag-angular tag-lg"><i class="fa-solid fa-tag"></i>angular</span></a>

                    <a href="/tags/react/"><span class="tag tag-react tag-lg"><i class="fa-solid fa-tag"></i>react</span></a>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;