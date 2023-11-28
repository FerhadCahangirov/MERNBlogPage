import { useRegisterReducer } from '../../../customHooks/authCustomHooks';
import '../../../static/auth.css';
const Autherization = () => {

    const { register, Username_Encapsulated, Fullname_Encapsulated, Email_Encapsulated, Password_Encapsulated, PasswordConfirm_Encapsulated } = useRegisterReducer();

    return (
        <div id="main-wrapper" className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div className="card border-0">
                        <div className="card-body p-0">
                            <div className="row no-gutters">

                                <div className="col-lg-6 d-none d-lg-inline-block">
                                    <div className="account-block rounded-right">
                                        <div className="overlay rounded-right"></div>
                                        <div className="account-testimonial">
                                            <h4 className="text-white mb-4">This  beautiful theme yours!</h4>
                                            <p className="lead text-white">"Best investment i made for a long time. Can only recommend it for other users."</p>
                                            <p>- Admin User</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="mb-5">
                                            <h3 className="h4 font-weight-bold text-theme">Register</h3>
                                        </div>

                                        <div>
                                            <div className="form-group">
                                                <label>Fullname</label>
                                                <input type="text" className="form-control"
                                                    value={Fullname_Encapsulated.get}
                                                    onChange={event => { Fullname_Encapsulated.set(event.target.value) }} />
                                            </div>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input type="text" className="form-control"
                                                    value={Username_Encapsulated.get}
                                                    onChange={event => { Username_Encapsulated.set(event.target.value) }} />
                                            </div>
                                            <div className="form-group">
                                                <label >Email address</label>
                                                <input type="email" className="form-control"
                                                    value={Email_Encapsulated.get}
                                                    onChange={event => { Email_Encapsulated.set(event.target.value) }} />
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" className="form-control"
                                                    value={Password_Encapsulated.get}
                                                    onChange={event => { Password_Encapsulated.set(event.target.value) }} />
                                            </div>
                                            <div className="form-group mb-5">
                                                <label>Password Confirm</label>
                                                <input type="password" className="form-control"
                                                    value={PasswordConfirm_Encapsulated.get}
                                                    onChange={event => { PasswordConfirm_Encapsulated.set(event.target.value) }} />
                                            </div>
                                            <a className="btn btn-theme" onClick={() => register()}>Register</a>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <p className="text-muted text-center mt-3 mb-0">Already have an account? <a href="login" className="text-primary ml-1">login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Autherization;