export const CREATE_POST_INITIAL_STATE = {
  error: false,
  errorData: {},
  loading: false,
  content: '',
  title: "",
  description: "",
  category: "",
  tags: [],
  success: false,
  successData: {}
};

export const CREATE_POST_ACTIONS = {
  CONTENT_CHANGE: "CONTENT_CHANGE",
  TITLE_CHANGE: "TITLE_CHANGE",
  DESCRIPTION_CHANGE: "DESCRIPTION_CHANGE",
  TAGS_CHANGE: "TAGS_CHANGE",
  CATEGORY_CHANGE: "CHANGE_CATEGORY",
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  CLEAR: "CLEAR"
}

export const createPostReducer = (state = CREATE_POST_INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_POST_ACTIONS.CONTENT_CHANGE:
      return { ...state, content: action.payload };
    case CREATE_POST_ACTIONS.TITLE_CHANGE:
      return { ...state, title: action.payload };
    case CREATE_POST_ACTIONS.DESCRIPTION_CHANGE:
      return { ...state, description: action.payload };
    case CREATE_POST_ACTIONS.TAGS_CHANGE:
      return { ...state, tags: action.payload };
    case CREATE_POST_ACTIONS.CATEGORY_CHANGE:
      return { ...state, category: action.payload };
    case CREATE_POST_ACTIONS.FETCH_START:
      return { ...state, loading: true, error: false };
    case CREATE_POST_ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, success: true, error: false, successData: action.payload };
    case CREATE_POST_ACTIONS.FETCH_ERROR:
      return { ...state, loading: false, error: true, success: false, errorData: action.payload };
    case CREATE_POST_ACTIONS.CLEAR:
      return CREATE_POST_INITIAL_STATE
    default:
      return state;
  }
};






