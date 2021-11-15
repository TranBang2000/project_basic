import {
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from "../contexts/constants";


export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        data: payload,
        postsLoading: false,
      };
    case POSTS_LOADED_FAIL:
      return {
        ...state,
        data: [],
        postsLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        data: [...state.data, payload],
      };
    case DELETE_POST:
      return {
        ...state,
        data: state.data.filter((post) => post._id !== payload),
      };
    case FIND_POST:
      return { ...state, post: payload };

    case UPDATE_POST:
      const newPosts = state.data.map((post) =>
        post._id === payload._id ? payload : post
      );
      return {
        ...state,
        data: newPosts,
      };

    default:
      return state;
  }
};
