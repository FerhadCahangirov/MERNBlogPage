import React from 'react'

function Footer() {

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Smooth scrolling animation
        });
    }

    return (
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
                <span onClick={() => scrollToTop()}><i class="fas fa-arrow-circle-up fa-2x"></i></span>
            </div>
        </footer>
    )
}

export default Footer;