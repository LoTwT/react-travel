import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"

import styles from "./Search.module.css"
import { FilterArea, ProductList } from "../../components"
import { Spin } from "antd"
import { searchProduct } from "../../redux/productSearch/slice"
import { useSelector } from "../../redux/hooks"
import { useDispatch } from "react-redux"
import { MainLayout } from "../../layouts/mainLayout"

interface MatchParams {
  keywords: string
}

export const Search: React.FC = () => {
  const { keywords } = useParams<MatchParams>()
  const {
    loading,
    error,
    pagination,
    data: productList,
  } = useSelector((state) => state.productSearch)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }))
  }, [location])

  const onPageChange = (
    nextPage: number | string,
    pageSize: number | string,
  ) => {
    dispatch(searchProduct({ nextPage, pageSize, keywords }))
  }

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    )
  }

  if (error) {
    return <div>网站出错: {error}</div>
  }

  return (
    <>
      <MainLayout>
        {/* 分类过滤器 */}
        <div className={styles["product-list-container"]}>
          <FilterArea />
        </div>

        {/* 产品列表 */}
        <div className={styles["product-list-container"]}>
          <ProductList
            data={productList}
            paging={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </MainLayout>
    </>
  )
}
