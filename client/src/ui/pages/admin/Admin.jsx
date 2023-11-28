import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Admin = () => {

    const location = useLocation()
    const [url, setUrl] = useState("");
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    return (
        <>
            <div className='container-fluid admin-container'>
                <div className='row' style={{ 'height': '100vh' }}>

                    <nav id="sidebarMenu" className={`${opened ? 'active_sidebar vertical-scroll ps-container ps-theme-default ps-active-y' : 'hidden-sidebar'}`} >
                        {
                            opened && <>

                                <a className='d-flex align-items-center mb-3 mt-5 mb-md-0 me-md-auto text-white text-decoration-none'>
                                    <h2 className='fs-4 text-dark'>
                                        ADMIN PANEL
                                    </h2>
                                </a>
                                <ul className="nav nav-pills flex-column mb-auto mt-5">
                                    <li className="nav-item">
                                        <Link to={'users'} className={`nav-link border-bottom-animation ${url === "/Admin/users" || url === "/admin/users" ? "border-bottom-animation-active" : ""}`} style={{ 'width': "85%", 'margin': '.8rem auto' }}>
                                            <i className="fa-solid fa-square-plus"></i> Users
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'posts'} className={`nav-link border-bottom-animation ${url === "/Admin/posts" || url === "/admin/posts" ? "border-bottom-animation-active" : ""}`} style={{ 'width': "85%", 'margin': '.8rem auto' }}>
                                            <i className="fa-solid fa-pager"></i> Posts
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'services'} className={`nav-link border-bottom-animation ${url === "/Admin/services" || url === "/admin/services" ? "border-bottom-animation-active" : ""}`} style={{ 'width': "85%", 'margin': '.8rem auto' }}>
                                            <i class="fa-brands fa-servicestack"></i> Services
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'categories'} className={`nav-link border-bottom-animation ${url === "/Admin/categories" || url === "/admin/categories" ? "border-bottom-animation-active" : ""}`} style={{ 'width': "85%", 'margin': '.8rem auto' }}>
                                            <i class="fa-solid fa-layer-group"></i> Categories
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'tags'} className={`nav-link border-bottom-animation ${url === "/Admin/tags" || url === "/admin/tags" ? "border-bottom-animation-active" : ""}`} style={{ 'width': "85%", 'margin': '.8rem auto' }}>
                                            <i class="fa-solid fa-tags"></i> Tags
                                        </Link>
                                    </li>


                                </ul>

                                <div className="sidebar_footer">
                                    <a className='d-flex align-items-center mb-3 mb-md-4 me-md-auto mt-2 home-icon' href='/'><i className='fa-sharp fa-solid fa-house'></i></a>
                                </div>


                            </>
                        }
                    </nav>

                    <section className='main_content'>
                        <div class="container-fluid g-0">
                            <div class="row">
                                <div class="col-lg-12 p-0 ">
                                    <div class="header_iner d-flex justify-content-between align-items-center">
                                        <div class="sidebar_icon">
                                            {
                                                !opened && <i class="fa-solid fa-bars menu-icon" onClick={() => setOpened(true)}></i>
                                            }
                                        </div>
                                        <div class="serach_field-area d-flex align-items-center">
                                        </div>
                                        <div class="header_right d-flex justify-content-between align-items-center">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => setOpened(false)} className={`wrapper ${opened && 'active'}`}>
                            <Outlet />
                        </div>

                    </section>
                </div>
            </div>
        </>
    );
};

export default Admin;
