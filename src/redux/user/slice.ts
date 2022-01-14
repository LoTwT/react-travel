import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface UserState {
  loading: boolean
  error: string | null
  token: string | null
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
}

export const signIn = createAsyncThunk(
  "user/signIn",
  async (
    params: {
      email: string
      password: string
    },
    thunkAPI,
  ) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_PROXY.replace("/api", "")}/auth/login`,
      {
        email: params.email,
        password: params.password,
      },
    )
    return data.token
  },
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null
      state.error = null
      state.loading = false
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload
      state.loading = false
      state.error = null
    },
    [signIn.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
