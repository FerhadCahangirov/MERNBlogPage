export const REGISTER_INITIAL_STATE = {
    error: false,
    errorData: {},
    loading: false,
    fullname: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    success: false,
    successData: {}
};

export const REGISTER_ACTIONS = {

    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    USERNAME_CHANGE: "USERNAME_CHANGE",
    FULLNAME_CHANGE: "FULLNAME_CHANGE",
    EMAIL_CHANGE: "EMAIL_CHANGE",
    PASSWORD_CHANGE: "PASSWORD_CHANGE",
    PASSWORD_CONFIRM_CHANGE: "PASSWORD_CONFIRM_CHANGE"
}

export const registerReducer = (state = REGISTER_INITIAL_STATE, action) => {
    switch (action.type) {

        case REGISTER_ACTIONS.FULLNAME_CHANGE:
            return { ...state, fullname: action.payload }
        case REGISTER_ACTIONS.USERNAME_CHANGE:
            return { ...state, username: action.payload }
        case REGISTER_ACTIONS.EMAIL_CHANGE:
            return { ...state, email: action.payload }
        case REGISTER_ACTIONS.PASSWORD_CHANGE:
            return { ...state, password: action.payload }
        case REGISTER_ACTIONS.PASSWORD_CONFIRM_CHANGE:
            return { ...state, passwordConfirm: action.payload }
        case REGISTER_ACTIONS.FETCH_START:
            return { ...state, loading: true, error: false };
        case REGISTER_ACTIONS.FETCH_SUCCESS:
            return { ...state, loading: false, success: true, error: false, successData: action.payload };
        case REGISTER_ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: true, success: false, errorData: action.payload };
        default:
            return state;
    }
}