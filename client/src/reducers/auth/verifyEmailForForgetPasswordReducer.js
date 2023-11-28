export const VERIFY_EMAIL_FOR_FORGET_PASSWORD_INITIAL_STATE = {
    error: false,
    errorData: {},
    loading: false,
    email: '',
    success: false,
    successData: {}
};

export const VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS = {

    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    EMAIL_CHANGE: "EMAIL_CHANGE"
}

export const verifyEmailForForgetPasswordReducer = (state = VERIFY_EMAIL_FOR_FORGET_PASSWORD_INITIAL_STATE, action) => {
    switch (action.type) {
        case VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS.EMAIL_CHANGE:
            return { ...state, email: action.payload }
        case VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS.FETCH_START:
            return { ...state, loading: true, error: false };
        case VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS.FETCH_SUCCESS:
            return { ...state, loading: false, success: true, error: false, successData: action.payload };
        case VERIFY_EMAIL_FOR_FORGET_PASSWORD_ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: true, success: false, errorData: action.payload };
        default:
            return state;
    }
}

