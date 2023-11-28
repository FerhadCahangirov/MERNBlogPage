import React from 'react'
import slidevideo from '../../../../static/files/videos/video.mp4';


function Header() {
    return (
        <>
            <header>
                <a href="#" className="brand" data-aos="fade-right" data-aos-delay="300">BEST</a>
                <div className="menu-btn" data-aos="fade-left" data-aos-delay="300"></div>
                <div className="navigation" data-aos="fade-left" data-aos-delay="300">
                    <div className="navigation-items">
                        <a href="#">Home</a>
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

            <section className="home">
                
                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <video className="video-slide active" src={slidevideo} autoPlay muted loop>
                </video>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div className="content" data-aos="fade-right" data-aos-delay="300">
                                <h1>Wonderful. <br /><span>Place</span></h1>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem quibusdam iusto reiciendis culpa facilis recusandae, ad alias aliquam hic quisquam voluptatum necessitatibus est provident iure nam numquam expedita harum maiores.
                                </p>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div className="content">
                                <h1>Beauteful. <br /><span>Place</span></h1>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem quibusdam iusto reiciendis culpa facilis recusandae, ad alias aliquam hic quisquam voluptatum necessitatibus est provident iure nam numquam expedita harum maiores.
                                </p>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div className="content">
                                <h1>Amazing. <br /><span>Place</span></h1>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem quibusdam iusto reiciendis culpa facilis recusandae, ad alias aliquam hic quisquam voluptatum necessitatibus est provident iure nam numquam expedita harum maiores.
                                </p>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="media-icons" data-aos="fade-left" data-aos-delay="300">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
                <div class="slider-navigation" data-aos="fade-down">
                    <div type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="nav-btn" aria-current="true" aria-label="Slide 1"></div>
                    <div type="button" className="nav-btn" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></div>
                    <div type="button" className="nav-btn" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></div>
                </div>
            </section>
        </>
    )
}

export default Header