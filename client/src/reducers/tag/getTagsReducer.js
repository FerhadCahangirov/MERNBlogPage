export const GET_TAGS_INITAL_STATE = {
    loading: false,
    tagsData: [],
    error: false,
    errorData: {},
    page: 0,
    size: 9,
    content: '',
    paginationList: [],
    selectedTag: {}
};

export const GET_TAGS_ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    CHANGE_PAGE: "CHANGE_PAGE",
    CHANGE_SIZE: "CHANGE_SIZE",
    CHANGE_CONTENT: "CHANGE_CONTENT",
    CHANGE_PAGINATION_LIST: "CHANGE_PAGINATION_LIST",
    CHANGE_SELECTED_TAG: "CHANGE_SELECTED_TAG"
}

const getTagsReducer = (state = GET_TAGS_INITAL_STATE, action) => {
    switch (action.type) {
        case GET_TAGS_ACTION_TYPES.FETCH_START:
            return { ...state, loading: true, error: false, };
        case GET_TAGS_ACTION_TYPES.FETCH_SUCCESS:
            return { ...state, loading: false, error: false, tagsData: action.payload, selectedTag: action.payload.tags[0] };
        case GET_TAGS_ACTION_TYPES.FETCH_ERROR:
            return { ...state, loading: false, error: true, errorData: action.payload };
        case GET_TAGS_ACTION_TYPES.CHANGE_CONTENT:
            return { ...state, content: action.payload }
        case GET_TAGS_ACTION_TYPES.CHANGE_SIZE:
            return { ...state, size: action.payload }
        case GET_TAGS_ACTION_TYPES.CHANGE_PAGE:
            return { ...state, page: action.payload }
        case GET_TAGS_ACTION_TYPES.CHANGE_PAGINATION_LIST:
            return { ...state, paginationList: action.payload }
        case GET_TAGS_ACTION_TYPES.CHANGE_SELECTED_TAG:
            return { ...state, selectedTag: action.payload }
        default:
            return state;
    }
};

export default getTagsReducer;

