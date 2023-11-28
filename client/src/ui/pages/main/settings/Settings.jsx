import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import user from  '../../../../static/files/user.png';
import getToken from '../../../../utils/getToken';


function Settings() {

    const { userId } = useParams();
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/users/find/${userId}`).then(response => response.json()).then(response => {
            setFullname(response.fullname);
            setUsername(response.username);
            setEmail(response.email);
            setProfileImageUrl(response.profileImageUrl);
        }).catch(error => console.log(error));
    }, []);


    const handleUploadProfile = (e) => {
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
                    credentials: 'include'
                };

                fetch(`http://localhost:8080/users/upload/${userId}`, requestOptions).then(response => response.json())
                    .then(response => {
                        if (response.success) {
                            Swal.fire({
                                title: response.message,
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Ok',
                            }).then((result) => {
                                if (result.isConfirmed) window.location.reload();
                            })
                        }
                        else Swal.fire({ icon: 'error', title: response.message });
                    }).catch(error => Swal.fire({ icon: 'error', title: error.message }));
            }
        });
    }

    const handleRemoveProfile = (e) => {
        Swal.fire({
            title: 'Are you sure to remove profile picture?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                const TOKEN = getToken();

                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
                    credentials: 'include'
                };

                fetch(`http://localhost:8080/users/unupload/${userId}`, requestOptions).then(response => response.json())
                    .then(response => {
                        if (response.success) {
                            Swal.fire({
                                title: response.message,
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Ok',
                            }).then((result) => {
                                if (result.isConfirmed) window.location.reload();
                            })
                        }
                        else Swal.fire({ icon: 'error', title: response.message });
                    }).catch(error => Swal.fire({ icon: 'error', title: error.message }));
            }
        })
    }

    const saveChanges = (e) => {
        e.preventDefault();

        const data = { fullname: fullname, username: username, email: email };
        const TOKEN = getToken();
        const requestOptions = {
            method: 'PUT', body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
            credentials: 'include'
        };
        fetch(`http://localhost:8080/users/${userId}`, requestOptions).then(response => response.json())
            .then(response => {
                if (response.success) {
                    Swal.fire({
                        title: response.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok',
                    }).then((result) => {
                        if (result.isConfirmed) window.location.reload();
                    })
                }
                else Swal.fire({ icon: 'error', title: response.message });
            }).catch(error => Swal.fire({ icon: 'error', title: error.message }));
    }

    return (
        <div className="container m-3">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                    <i className='fa-home fa-solid' style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/"; }}></i> <br /><br />
                    <h2 className="h3 mb-4 page-title">Settings</h2>
                    <div className="my-4">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Profile</a>
                            </li>
                        </ul>
                        <form>
                            <div className="row mt-5 align-items-center">
                                <div className="col-md-3 text-center mb-5">
                                    <div className="avatar avatar-xl">
                                        <img src={profileImageUrl ? profileImageUrl : user} alt="..." className="avatar-img rounded-circle" style={{width: '150px', height: '150px'}}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row align-items-center">
                                        <div className="col-md-7">
                                            <h4 className="mb-1">Change profile image</h4>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        {
                                            profileImageUrl ? <div onClick={(e) => handleRemoveProfile(e)} className="btn btn-rounded m-2" style={{ cursor: 'pointer', width: '25%' }} >
                                                Remove Image
                                            </div> : <div type='file' onClick={(e) => handleUploadProfile(e)} className="btn btn-rounded m-2" style={{ cursor: 'pointer', width: '25%' }} >
                                                Select Image
                                            </div>
                                        }

                                    </div>

                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Fullname</label>
                                    <input type="text" className="form-control" placeholder="Firstname Lastname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Username</label>
                                <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label >Email</label>
                                <input type="email" className="form-control" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div type="submit" className="btn mt-3" onClick={(e) => saveChanges(e)}>Save Change</div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Settings