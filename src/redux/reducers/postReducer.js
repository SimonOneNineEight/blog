import { createSlice } from "@reduxjs/toolkit";
import { getPostById, getAllPost as getAllPostFromApi } from "../../WebApi";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    post: [],
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { setIsLoading, setPost } = postReducer.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  getPostById(id).then((post) => {
    dispatch(setPost(post));
    dispatch(setIsLoading(false));
  });
};
export const getAllPost = () => (dispatch) => {
  dispatch(setIsLoading(true));
  getAllPostFromApi().then((post) => {
    dispatch(setPost(post));
    dispatch(setIsLoading(false));
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPosts = (state) => state.posts.post;
export const selectIsLoading = (state) => state.posts.isLoading;

export default postReducer.reducer;