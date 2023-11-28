import { useLoginReducer } from '../../../customHooks/authCustomHooks';
import '../../../static/auth.css'

const Authentication = () => {

    const { login, UsernameOrPassword_Encapsulated, Password_Encapsulated } = useLoginReducer();

    return (

        <div id="main-wrapper" className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-xl-10">
                    <div className="card border-0">
                        <div className="card-body p-0">
                            <div className="row no-gutters">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="mb-5">
                                            <h3 className="h4 font-weight-bold text-theme">Login</h3>
                                        </div>

                                        <h6 className="h5 mb-0">Welcome back!</h6>
                                        <p className="text-muted mt-2 mb-5">Enter your email address and password to log in.</p>

                                        <div>
                                            <div className="form-group">
                                                <label>Username or email</label>
                                                <input type="text" className="form-control"
                                                    value={UsernameOrPassword_Encapsulated.get}
                                                    onChange={event => UsernameOrPassword_Encapsulated.set(event.target.value)} />
                                            </div>
                                            <div className="form-group mb-5">
                                                <label >Password</label>
                                                <input type="password" className="form-control"
                                                    value={Password_Encapsulated.get}
                                                    onChange={event => Password_Encapsulated.set(event.target.value)} />
                                            </div>
                                            <a className="btn btn-theme" onClick={() => login()}>Login</a>
                                            <a href="verifyEmail" className="forgot-link float-right text-primary m-3">Forgot password?</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 d-none d-lg-inline-block">
                                    <div className="account-block rounded-right">
                                        <div className="overlay rounded-right"></div>
                                        <div className="account-testimonial">
                                            <h4 className="text-white mb-4">This  beautiful theme yours!</h4>
                                            <p className="lead text-white">"Best investment i made for a long time. Can only recommend it for other users."</p>
                                            <p>- User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <p className="text-muted text-center mt-3 mb-0">Don't have an account? <a href="register" className="text-primary ml-1">register</a></p>
                </div>
            </div>
        </div>
    )
}

export default Authentication;