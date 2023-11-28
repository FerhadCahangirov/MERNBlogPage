import { useEffect, useReducer } from "react"
import { LOGIN_ACTIONS, LOGIN_INITIAL_STATE, loginReducer } from "../reducers/auth/loginReducer"
import { fetch_Login, fetch_Register, fetch_VerifyEmailForForgetPassword } from "../fetchFunctions/fetchAuth";
import Swal from "sweetalert2";
import { REGISTER_ACTIONS, REGISTER_INITIAL_STATE, registerReducer } from "../reducers/auth/registerReducer";
import { VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS, VERIFY_EMAIL_FOR_FORGET_PASSWORD_INITIAL_STATE, verifyEmailForForgetPasswordReducer } from "../reducers/auth/verifyEmailForForgetPasswordReducer";

export const useLoginReducer = () => {

    const [state, dispatch] = useReducer(loginReducer, LOGIN_INITIAL_STATE);

    const UsernameOrPassword_Encapsulated = {
        get: state.usernameOrEmail,
        set: (usernameOrEmail) => dispatch({ type: LOGIN_ACTIONS.USERNAMEOREMAIL_CHANGE, payload: usernameOrEmail })
    }

    const Password_Encapsulated = {
        get: state.password,
        set: (password) => dispatch({ type: LOGIN_ACTIONS.PASSWORD_CHANGE, payload: password })
    }

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
    }, [state.error, state.errorData])

    useEffect(() => {
        if (state.success) {
            Swal.fire({ icon: 'success', title: state.successData.message });
            window.location.href = "/";
        }
    }, [state.success, state.successData])

    const login = () => {
        if (UsernameOrPassword_Encapsulated.get === '' || Password_Encapsulated.get === '') {
            dispatch({ type: LOGIN_ACTIONS.FETCH_ERROR, payload: { message: 'Please fill all the inputs!' } });
        }
        else {
            const data = {
                "usernameOrEmail": UsernameOrPassword_Encapsulated.get,
                "password": Password_Encapsulated.get
            }
            dispatch({ type: LOGIN_ACTIONS.FETCH_START });
            fetch_Login(data)
                .then(response => response.success ? dispatch({ type: LOGIN_ACTIONS.FETCH_SUCCESS, payload: response.message })
                    : dispatch({ type: LOGIN_ACTIONS.FETCH_ERROR, payload: response.message }))
                .catch(error => dispatch({ type: LOGIN_ACTIONS.FETCH_ERROR, payload: error }));
        }
    }

    return { login, UsernameOrPassword_Encapsulated, Password_Encapsulated }
}

export const useRegisterReducer = () => {

    const [state, dispatch] = useReducer(registerReducer, REGISTER_INITIAL_STATE);

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
    }, [state.error, state.errorData])

    useEffect(() => {
        if (state.success) {
            Swal.fire({ icon: 'success', title: state.successData.message });
            window.location.href = "/login";
        }
    }, [state.success, state.successData])

    const Fullname_Encapsulated = {
        get: state.fullname,
        set: (fullname) => dispatch({ type: REGISTER_ACTIONS.FULLNAME_CHANGE, payload: fullname })
    }

    const Username_Encapsulated = {
        get: state.username,
        set: (username) => dispatch({ type: REGISTER_ACTIONS.USERNAME_CHANGE, payload: username })
    }

    const Email_Encapsulated = {
        get: state.email,
        set: (email) => dispatch({ type: REGISTER_ACTIONS.EMAIL_CHANGE, payload: email })
    }

    const Password_Encapsulated = {
        get: state.password,
        set: (password) => dispatch({ type: REGISTER_ACTIONS.PASSWORD_CHANGE, payload: password })
    }

    const PasswordConfirm_Encapsulated = {
        get: state.passwordConfirm,
        set: (passwordConfirm) => dispatch({ type: REGISTER_ACTIONS.PASSWORD_CONFIRM_CHANGE, payload: passwordConfirm })
    }

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
    }, [state.error, state.errorData])

    useEffect(() => {
        if (state.success) {
            Swal.fire({ icon: 'success', title: state.successData.message });
            window.location.href = "/";
        }
    }, [state.success, state.successData])

    const register = () => {
        if (
            Username_Encapsulated.get === ''
            || Fullname_Encapsulated.get === ''
            || Email_Encapsulated.get === ''
            || Password_Encapsulated.get === ''
        ) {
            dispatch({ type: REGISTER_ACTIONS.FETCH_ERROR, payload: { message: 'Fill all the inputs!' } });
        } else if (PasswordConfirm_Encapsulated.get !== Password_Encapsulated.get) {
            dispatch({ type: REGISTER_ACTIONS.FETCH_ERROR, payload: { message: "Passwords don't match!" } });
        } else {
            const data = {
                fullname: Fullname_Encapsulated.get,
                username: Username_Encapsulated.get,
                email: Email_Encapsulated.get,
                password: Password_Encapsulated.get,
            };
            dispatch({ type: REGISTER_ACTIONS.FETCH_START })

            fetch_Register(data)
                .then(response => response.success ?
                    dispatch({ type: REGISTER_ACTIONS.FETCH_SUCCESS, payload: response.message })
                    : dispatch({ type: REGISTER_ACTIONS.FETCH_ERROR, payload: response.message })
                )
                .catch(error => dispatch({ type: REGISTER_ACTIONS.FETCH_ERROR, payload: error }))
        }
    };

    return { register, Username_Encapsulated, Fullname_Encapsulated, Email_Encapsulated, Password_Encapsulated, PasswordConfirm_Encapsulated, loading: state.loading }

}

export const useVerifyEmailForForgetPasswordReducer = () => {

    const [state, dispatch] = useReducer(verifyEmailForForgetPasswordReducer, VERIFY_EMAIL_FOR_FORGET_PASSWORD_INITIAL_STATE);

    const Email_Encapsulated = {
        get: state.email,
        set: (email) => dispatch({ type: VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS.EMAIL_CHANGE, payload: email })
    }

    useEffect(() => {
        state.error && Swal.fire({ icon: 'error', title: state.errorData.message });
    }, [state.error, state.errorData])

    useEffect(() => {
        state.success && Swal.fire({ icon: 'success', title: state.successData.message });
    }, [state.success, state.successData])

    const sendVerifyEmail = () => {
        Email_Encapsulated.get === '' ?
            dispatch({ type: VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS.FETCH_ERROR, payload: { message: 'Write your email adress!' } })
            : fetch_VerifyEmailForForgetPassword({ email: Email_Encapsulated.get })
                .then(response => response.success ?
                    dispatch({ type: VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS.FETCH_SUCCESS, payload: response.message })
                    : dispatch({ type: VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS.FETCH_ERROR, payload: response.message }))
                .catch(error => dispatch({ type: VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS.FETCH_ERROR, payload: error }))

    }

    return { sendVerifyEmail, Email_Encapsulated }




}