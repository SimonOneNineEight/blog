import { createSlice } from "@reduxjs/toolkit";
import { login as loginApi, getMe } from "../../WebApi";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const login = (email, password) => (dispatch) => {
  loginApi(email, password).then((res) => {
    if (!res.user) return;
    const user = getMe();
    if (user) {
      dispatch(setUser(user));
    }
  });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state) => state.users.user;

export default userSlice.reducer;
