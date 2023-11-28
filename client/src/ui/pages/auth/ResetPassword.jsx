import Swal from 'sweetalert2';
import '../../../static/auth.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {

    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password, confirmPassword: passwordConfirm }),
            credentials: 'include',
        };


        if (password === passwordConfirm) {
            fetch(`http://localhost:8080/auth/resetPasswordVerify/${token}`, requestOptions).then(response => response.json()).then(response => {
                if (response.success) {
                    Swal.fire({
                        title: response.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) 
                            window.location.href="/login";
                    })
                }
                else Swal.fire({ icon: 'error', title: response.message });
            }).catch(error => Swal.fire({ icon: 'error', title: error }))
        }

    }

    return (
        <div id="main-wrapper" className="container mt-5">
            <div className="col-lg-6">
                <div className="p-5">
                    <div className="mb-5">
                        <h3 className="h4 font-weight-bold text-theme">Verify Email</h3>
                    </div>

                    <p className="text-muted mt-2 mb-5">Enter your email address</p>

                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="text" className="form-control" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-theme mt-3">Reset your password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword