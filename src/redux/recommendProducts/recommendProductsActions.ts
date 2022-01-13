export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START" // 正在调用推荐信息 api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  "FETCH_RECOMMEND_PRODUCTS_SUCCESS" // 推荐信息 api 调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL" // 推荐信息 api 调用失败

interface FetchRecommendProductsStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductsSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS
  payload: any
}

interface FetchRecommendProductsFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL
  payload: any
}

export type RecommendProductsAction =
  | FetchRecommendProductsStartAction
  | FetchRecommendProductsSuccessAction
  | FetchRecommendProductsFailAction

export const fetchRecommendProductsStartActionCreator =
  (): FetchRecommendProductsStartAction => ({
    type: FETCH_RECOMMEND_PRODUCTS_START,
  })

export const fetchRecommendProductsSuccessActionCreator = (
  data: any,
): FetchRecommendProductsSuccessAction => ({
  type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
  payload: data,
})

export const fetchRecommendProductsFailActionCreator = (
  error: any,
): FetchRecommendProductsFailAction => ({
  type: FETCH_RECOMMEND_PRODUCTS_FAIL,
  payload: error,
})
