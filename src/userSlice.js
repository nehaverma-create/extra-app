import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return await response.json();
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});   

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;

// ================= SELECTORS =================

export const userRootSelector = (state) => state.users;

export const getUsers = createSelector(
  [userRootSelector],
  (state) => state?.users || []
);

export const getIsUsersLoading = createSelector(
  [userRootSelector],
  (state) => state?.loading || false
);

export const getIsUsersError = createSelector(
  [userRootSelector],
  (state) => state?.error || null
);