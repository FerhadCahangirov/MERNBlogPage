import { useContext, useEffect, useState } from "react"
import Badge from "react-bootstrap/esm/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus, faRemove, faBlackboard, faComment } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import getToken from "../../../Utils/getToken";
import { Link } from "react-router-dom";

const Service = (props) => {
    const { _id, title, description, imageUrl, fetchServices } = props;

    const hadndleDelete = (_postId) => {
        Swal.fire({
            title: 'Are you sure to?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const TOKEN = getToken();
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
                };
                fetch(`http://localhost:8080/services/${_id}`, requestOptions)
                    .then(response => response.json())
                    .then(response => {
                        if (response.success) {
                            Swal.fire({ icon: 'success', title: response.message });
                            window.location.reload();
                        } else {
                            Swal.fire({ icon: 'error', title: response.message });
                        }
                    }).catch(error => Swal.fire({ icon: 'error', title: error.message }));
            }
        });
    }

    const handleUpload = (_serviceId) => {
        Swal.fire({
            title: 'Upload a file',
            html: '<input type="file" id="file-input" />',
            confirmButtonText: 'Upload',
            preConfirm: () => {
                const inputFile = document.getElementById('file-input');
                if (inputFile.files.length === 0) {
                    Swal.showValidationMessage('Please select a file');
                }
                return { file: inputFile.files[0] };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Submit the form or perform the file upload
                const TOKEN = getToken();
                const formData = new FormData();
                formData.append('image', result.value.file);
                const requestOptions = {
                    method: 'POST', body: formData,
                    headers: { 'Authorization': `Bearer ${TOKEN}` },
                };
                fetch(`http://localhost:8080/services/upload/${_serviceId}`, requestOptions)
                    .then(response => response.json())
                    .then(response => {
                        if (response.success) {
                            Swal.fire({ icon: 'success', title: response.message });
                            fetchServices();
                        }
                        else Swal.fire({ icon: 'success', title: response.message });
                    })
                    .catch(error => { Swal.fire({ icon: 'error', title: error.message, text: error.stack }) })
            }
        });
    }

    const handleRemove = (_serviceId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            const TOKEN = getToken();
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
            };
            if (result.isConfirmed) {
                fetch(`http://localhost:8080/services/unupload/${_serviceId}`, requestOptions)
                    .then(response => response.json())
                    .then(response => {
                        if (response.success) {
                            Swal.fire({ icon: 'success', title: response.message });
                            fetchServices();
                        } else {
                            Swal.fire({icon: 'error', title: response.message});
                        }

                    }).catch(error => {
                        Swal.fire({ icon: 'error', title: error.message, text: error.stack });
                    });
            }
        })
    }

    return (

        <>
            <div class="col-lg-6">
                <div class="card_box position-relative">
                    <div class="white_box_tittle ">
                        <div class="main-title2 ">
                            <h4 class="mb-2 nowrap ">{title}</h4>
                            <p className="card-text">{description}</p>
                        </div>
                    </div>

                    <div class="box_body">
                        <img src={imageUrl} className="card-img img-fluid" />
                        <div className="row">
                            <div className="col-11 row justify-content-between">
                                <div>

                                </div>
                            </div>
                            <div className="col-1">
                                <div className={`row card_attributes`}>
                                    <a href={`/admin/post/${_id}`} className="m-2"><i class="fa-solid fa-eye"></i></a>
                                    <a className="m-2" onClick={() => hadndleDelete(_id)}><i className="fa-solid fa-trash "></i></a>
                                    <a className="m-2"><i className="fa-solid fa-pen-to-square "></i></a>
                                    {!imageUrl ? <a className="m-2" onClick={() => handleUpload(_id)} ><i class="fa-solid fa-image"></i></a> : <a className="m-2" onClick={() => { handleRemove(_id) }}><i class="fa-solid fa-ban"></i></a>}
                                    <a className="m-2"><i class="fa-solid fa-ellipsis"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Services = () => {

    const [servicesData, setServicesData] = useState([]);
    const [page, setPage] = useState(0);
    const [paginationList, setPaginationList] = useState([]);
    const [query, setQuery] = useState("");

    const fetchServices = async () => {
        const TOKEN = getToken();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
            credentials: 'include'
        };
        try {
            const response = await fetch(`http://localhost:8080/services/query?page=${page}&size=4&content=${query}`, requestOptions);
            const data = await response.json();
            setServicesData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const totalPages = Math.ceil(servicesData.totalCount / 4);
        const newPaginationList = [];
        for (let i = 1; i <= totalPages; i++) {
            newPaginationList.push({ number: i, isActive: i - 1 === page });
        }
        setPaginationList(newPaginationList);
    }, [page, setPage, servicesData, setServicesData, query, setQuery])

    useEffect(() => {
        fetchServices();
    }, [page, setServicesData, query, setQuery])

    const handlePrev = () => {
        if (page > 0) {
            setPage(prevState => prevState - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    const handleNext = () => {
        if (page < Math.ceil(servicesData.totalCount / 4) - 1) {
            setPage(prevState => prevState + 1);
            window.scrollTo({
                top: 0, behavior: 'smooth'
            });
        }
    }
    const handlePagination = (number, isActive) => {
        if (!isActive) {
            setPage(number - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <>
            <div className='main_content_iner overly_inner'>
                <div className="row">
                    <div class="col-12">
                        <div class="page_title_box d-flex align-items-center justify-content-between">
                            <div class="page_title_left">
                                <h3 class="f_s_30 f_w_700 text_white">Services</h3>
                                <ol class="breadcrumb page_bradcam mb-0">
                                    <li class="breadcrumb-item"><a>Admin Panel</a></li>
                                    <li class="breadcrumb-item active">Services</li>
                                </ol>
                            </div>
                            <Link to={"/admin/createservice"} class="white_btn3">Create Service</Link>
                        </div>
                        <div class="filter_box d-flex align-items-center justify-content-between">
                            <div class="search-box">
                                <button class="btn-search"><i class="fas fa-search"></i></button>
                                <input type="text" class="input-search" placeholder="Type to Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">

                    {servicesData && servicesData.services && servicesData.services.map(data => {
                        return <Service _id={data._id} title={data.title} description={data.description.length > 150 ? `${data.description.slice(0, 150)}...` : data.description} imageUrl={data.imageUrl} fetchServices={fetchServices} />;
                    })}
                </div>
                <div style={{ 'margin': '4.5rem 0' }}>
                    <nav class="pagination-outer" aria-label="Page navigation">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" aria-label="Previous" style={{ 'pointerEvents': `${page > 0 ? 'all' : 'none'}` }} onClick={() => handlePrev()} >
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            {
                                paginationList.map(pagination => {
                                    return (
                                        <li className={`page-item ${pagination.isActive && 'active'}`} onClick={() => handlePagination(pagination.number, pagination.isActive)}><a class="page-link">{pagination.number}</a></li>
                                    );
                                })
                            }
                            <li class="page-item">
                                <a class="page-link" aria-label="Next" style={{ 'pointerEvents': `${page < Math.ceil(servicesData.totalCount / 4) - 1 ? 'all' : 'none'}` }} onClick={() => handleNext()}>
                                    <span aria-hidden="true" >»</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default Services;