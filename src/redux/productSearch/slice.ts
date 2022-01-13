import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface ProductSearchState {
  loading: boolean
  error: string | null
  data: any
  pagination: any
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
}

export const searchProduct = createAsyncThunk(
  "productSearch/searchProduct",
  async (
    params: {
      keywords: string
      nextPage: number | string
      pageSize: number | string
    },
    thunkAPI,
  ) => {
    let url = `/v1/touristRoutes?pageNumber=${params.nextPage}&pageSize=${params.pageSize}`

    if (params.keywords) {
      url += `&keyword=${params.keywords}`
    }

    const response = await axios.get(url)
    return {
      data: response.data,
      pagination: JSON.parse(response.headers["x-pagination"]),
    }
  },
)

export const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      state.loading = true
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.data = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
      state.error = null
    },
    [searchProduct.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
