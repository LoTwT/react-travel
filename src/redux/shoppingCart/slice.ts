import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface ShoppingCartState {
  loading: boolean
  error: string | null
  items: any[]
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: [],
}

export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(`/v1/shoppingCart`, {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    })
    return data.shoppingCartItems
  },
)

export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (
    params: {
      jwt: string
      touristRouteId: string
    },
    thunkAPI,
  ) => {
    const { data } = await axios.post(
      `/v1/shoppingCart/items`,
      {
        touristRouteId: params.touristRouteId,
      },
      {
        headers: {
          Authorization: `bearer ${params.jwt}`,
        },
      },
    )
    return data.shoppingCartItems
  },
)

export const checkout = createAsyncThunk(
  "shoppingCart/checkout",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.post(`/v1/shoppingCart/checkout`, null, {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    })
    return data
  },
)

export const clearShoppingCartItem = createAsyncThunk(
  "shoppingCart/clearShoppingCartItem",
  async (
    params: {
      jwt: string
      itemIds: string[]
    },
    thunkAPI,
  ) => {
    return await axios.delete(
      `/v1/shoppingCart/items/(${params.itemIds.join(",")})`,
      {
        headers: {
          Authorization: `bearer ${params.jwt}`,
        },
      },
    )
  },
)

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      state.loading = true
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    [getShoppingCart.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    [addShoppingCartItem.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [checkout.pending.type]: (state) => {
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.items = []
      state.loading = false
      state.error = null
    },
    [checkout.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    [clearShoppingCartItem.pending.type]: (state) => {
      state.loading = true
    },
    [clearShoppingCartItem.fulfilled.type]: (state) => {
      state.items = []
      state.loading = false
      state.error = null
    },
    [clearShoppingCartItem.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
