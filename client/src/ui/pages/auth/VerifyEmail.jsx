import '../../../static/auth.css';
import React, { useState } from 'react';
import { useVerifyEmailForForgetPasswordReducer } from '../../../customHooks/authCustomHooks';

const VerifyEmail = () => {

    const { Email_Encapsulated, sendVerifyEmail } = useVerifyEmailForForgetPasswordReducer();

    return (
        <div id="main-wrapper" className="container mt-5">
            <div className="col-lg-6">
                <div className="p-5">
                    <div className="mb-5">
                        <h3 className="h4 font-weight-bold text-theme">Verify Email</h3>
                    </div>

                    <p className="text-muted mt-2 mb-5">Enter your email address</p>

                    <div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control"
                                value={Email_Encapsulated.get}
                                onChange={event => Email_Encapsulated.set(event.target.value)} />
                        </div>
                        <button className="btn btn-theme mt-3" onClick={() => sendVerifyEmail()}>Send link to email</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail