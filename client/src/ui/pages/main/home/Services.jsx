import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Services() {

    const slides = [
        {
            imageUrl: "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"
        },
        {
            imageUrl: "https://i.insider.com/60638bd66183e1001981966a?width=1136&format=jpeg"
        },
        {
            imageUrl: "https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg?cs=srgb&dl=pexels-katja-592077.jpg&fm=jpg"
        },
        {
            imageUrl: "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"
        },
        {
            imageUrl: "https://i.insider.com/60638bd66183e1001981966a?width=1136&format=jpeg"
        },
        {
            imageUrl: "https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg?cs=srgb&dl=pexels-katja-592077.jpg&fm=jpg"
        },
        {
            imageUrl: "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"
        },
        {
            imageUrl: "https://i.insider.com/60638bd66183e1001981966a?width=1136&format=jpeg"
        },
        {
            imageUrl: "https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg?cs=srgb&dl=pexels-katja-592077.jpg&fm=jpg"
        },
        {
            imageUrl: "https://i.insider.com/60638bd66183e1001981966a?width=1136&format=jpeg"
        },

    ]

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [shadowX, setShadowX] = useState(0);
    const [shadowY, setShadowY] = useState(0);

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const handleSlideChange = (swiper) => {
        setActiveSlideIndex(swiper.activeIndex);
    };

    const shadowBlur = 20,
        shadowSpread = 2,
        shadowXOffset = 0,
        shadowYOffset = 0;

    const renderRotate = function (event) {
        let coorX = event.clientX;
        let coorY = event.clientY;
        let w = window.innerWidth / 2;
        let h = window.innerHeight / 2;

        let posX = ~((-(coorX - w) / 8) / 2);
        let posY = ~~((-(coorY - h) / 8) / 2);



        let shadowX_Var = (-2 * posX + shadowXOffset);
        let shadowY_Var = (2 * posY + shadowYOffset);


        setX(posX);
        setY(posY);
        setShadowX(shadowX_Var);
        setShadowY(shadowY_Var);
    };

    const renderRotateClear = (event) => {
        setX(0);
        setY(0);
    }

    useEffect(() => {
        console.log(x, y)
    }, [x, y])



    return (
        <div className="services_container">

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={false}
                slidesPerView={'auto'}
                setWrapperSize={'auto'}
                spaceBetween={50}
                initialSlide={slides.length / 2}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}

                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
                onSlideChange={handleSlideChange}
            >

                {
                    slides.map((slide, index) => {
                        return <SwiperSlide>
                            <article className="card"
                                data-aos="zoom-in-up"
                                onMouseMove={(event) => index === activeSlideIndex && renderRotate(event)}
                                onMouseLeave={(event) => index === activeSlideIndex && renderRotateClear(event)}
                                style={{
                                    transform: `rotateX(${index === activeSlideIndex ? y : 0}deg) rotateY(${index === activeSlideIndex ? x : 0}deg)`,
                                }}
                            >
                                <img
                                    class="card__background"
                                    src={slide.imageUrl}
                                    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                                    width="1920"
                                    height="2193"
                                />
                                <div class="card__content | flow">
                                    <div class="card__content--container | flow">
                                        <h2 class="card__title">Dermoskopik Mualiceler</h2>
                                        <p class="card__description">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.Amet consectetur adipisicing elit. Animi sit nobis amet pariatur tempore explicabo molestias maiores...
                                        </p>
                                    </div>
                                    <button class="card__button">Read more</button>
                                </div>
                            </article>
                        </SwiperSlide>
                    })
                }


                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <i className='fa-solid fa-arrow-left'></i>  
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <i className='fa-solid fa-arrow-right'></i>

                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    );
}

export default Services;















































