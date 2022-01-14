import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { checkout } from "../shoppingCart/slice"

interface OrderState {
  loading: boolean
  error: string | null
  currentOrder: any
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null,
}

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (
    params: {
      jwt: string
      orderId: string
    },
    thunkAPI,
  ) => {
    const { data } = await axios.post(
      `/v1/orders/${params.orderId}/placeOrder`,
      null,
      {
        headers: {
          Authorization: `bearer ${params.jwt}`,
        },
      },
    )
    return data
  },
)

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      state.loading = true
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.loading = false
      state.error = null
    },
    [placeOrder.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [checkout.pending.type]: (state) => {
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.loading = false
      state.error = null
    },
    [checkout.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
