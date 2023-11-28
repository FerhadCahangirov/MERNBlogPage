import React, { useState } from 'react'

function Contact() {

    const [isVisible, setIsVisible] = useState(false);


    return (
        <>
            
            <section id="wrapper" className="ftco-section" onClick={() => {
                document.body.classList.remove('is-menu-visible');
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Contact Me</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="wrapper">
                                <div className="row mb-5">
                                    <div className="col-md-3">
                                        <div className="dbox w-100 text-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-map-marker"></span>
                                            </div>
                                            <div className="text">
                                                <p><span>Address:</span><br />Nerimanov naxuy</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="dbox w-100 text-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-phone"></span>
                                            </div>
                                            <div className="text">
                                                <p><span>Phone:</span> <br /> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="dbox w-100 text-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-paper-plane"></span>
                                            </div>
                                            <div className="text">
                                                <p><span>Email:</span><br /> <a>example@gmail.com</a> </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="dbox w-100 text-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-globe"></span>
                                            </div>
                                            <div className="text">
                                                <p><span>Website:</span><br /> <a href="#">yoursite.com</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-7">
                                        <div className="contact-wrap w-100 p-md-5 p-4">
                                            <h3 className="mb-4">Contact Us</h3>
                                            <div id="form-message-warning" className="mb-4"></div>
                                            <div id="form-message-success" className="mb-4">
                                                Your message was sent, thank you!
                                            </div>
                                            <form id="contactForm" name="contactForm">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="field field_v1">
                                                            <label className="ha-screen-reader">Fullname</label>
                                                            <input id="first-name" className="field__input" placeholder="e.g. Stanislav" />
                                                            <span className="field__label-wrap" aria-hidden="true">
                                                                <span className="field__label">Fullname</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="field field_v1">
                                                            <label className="ha-screen-reader">Email</label>
                                                            <input id="first-name" className="field__input" placeholder="e.g. Stanislav" />
                                                            <span className="field__label-wrap" aria-hidden="true">
                                                                <span className="field__label">Email</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="field field_v1">
                                                            <label className="ha-screen-reader">Subject</label>
                                                            <input id="first-name" className="field__input" placeholder="e.g. Stanislav" />
                                                            <span className="field__label-wrap" aria-hidden="true">
                                                                <span className="field__label">Subject</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="paragraph_textarea_container">
                                                            <div className="paragraph_textarea_box">
                                                                <textarea id="editor" rows="8" className="paragraph_textarea" placeholder="Write your message..."></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="submit" value="Send Message" className="btn btn-primary" />
                                                            <div className="submitting"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-5 d-flex align-items-stretch p-0">
                                        {/* style={{ backgroundImage: "url(https://c.stocksy.com/a/V1JF00/za/3648049.jpg)" }} */}
                                        
                                            <iframe  className="info-wrap img" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97261.66847329507!2d49.70091988325948!3d40.3772249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307da4940c7095%3A0xd2c9afdbdbfc4262!2sMedical%20City!5e0!3m2!1sen!2str!4v1684681738137!5m2!1sen!2str" width="600" height="450" style={{border: '0', width: 'fitContent', height: '769px'}} loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen="true"></iframe>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section id="footer" style={{ margin: "3.5rem 0 0 0 " }}>
                        <ul className="icons">
                            <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
                            <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
                            <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
                            <li><a href="#" className="icon solid fa-rss"><span className="label">RSS</span></a></li>
                            <li><a href="#" className="icon solid fa-envelope"><span className="label">Email</span></a></li>
                        </ul>
                        <p className="copyright">&copy; Untitled. Design: <a href="http://html5up.net">HTML5 UP</a>. Images: <a
                            href="http://unsplash.com">Unsplash</a>.</p>
                    </section>
                </div>

            </section>

        </>
    )
}

export default Contact