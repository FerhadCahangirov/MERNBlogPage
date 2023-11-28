export const LOGIN_INITIAL_STATE = {
    error: false,
    errorData: {},
    loading: false,
    usernameOrEmail: '',
    password: '',
    success: false,
    successData: {}
};

export const LOGIN_ACTIONS = {
    USERNAMEOREMAIL_CHANGE: "USERNAMEOREMAIL_CHANGE",
    PASSWORD_CHANGE: "PASSWORD_CHANGE",
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
}

export const loginReducer = (state = LOGIN_INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_ACTIONS.USERNAMEOREMAIL_CHANGE:
            return { ...state, usernameOrEmail: action.payload }
        case LOGIN_ACTIONS.PASSWORD_CHANGE:
            return { ...state, password: action.payload }
        case LOGIN_ACTIONS.FETCH_START:
            return { ...state, loading: true, error: false };
        case LOGIN_ACTIONS.FETCH_SUCCESS:
            return { ...state, loading: false, success: true, error: false, successData: action.payload };
        case LOGIN_ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: true, success: false, errorData: action.payload };
        default:
            return state;
    }
}