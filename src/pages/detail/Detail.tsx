import { useState, useEffect } from "react"
import { RouteComponentProps, useParams } from "react-router-dom"

import {
  Spin,
  Row,
  Col,
  DatePicker,
  Divider,
  Typography,
  Anchor,
  Menu,
  Button,
} from "antd"
import styles from "./Detail.module.css"
import { ProductIntro, ProductComments } from "../../components"
import { commentMockData } from "./mockup"
import {
  productDetailSlice,
  getProductDetail,
} from "../../redux/productDetail/slice"
import { useSelector } from "../../redux/hooks"
import { useDispatch } from "react-redux"
import { MainLayout } from "../../layouts/mainLayout"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { addShoppingCartItem } from "../../redux/shoppingCart/slice"

const { RangePicker } = DatePicker
interface MatchParams {
  touristRouteId: string
}

export const Detail: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const { touristRouteId } = useParams<MatchParams>()
  // const [loading, setLoading] = useState(true)
  // const [product, setProduct] = useState<any>(null)
  // const [error, setError] = useState<string | null>(null)

  const loading = useSelector((state) => state.productDetail.loading)
  const error = useSelector((state) => state.productDetail.error)
  const product = useSelector((state) => state.productDetail.data)

  const dispatch = useDispatch()

  const jwt = useSelector((state) => state.user.token) as string
  const shoppingCartLoading = useSelector((state) => state.shoppingCart.loading)

  useEffect(() => {
    // const fetchData = async () => {
    //   // try {
    //   //   setLoading(true)
    //   //   const { data } = await axios.get(`/v1/touristRoutes/${touristRouteId}`)
    //   //   setProduct(data)
    //   // } catch (error: any) {
    //   //   setError(error.message)
    //   // } finally {
    //   //   setLoading(false)
    //   // }

    //   try {
    //     dispatch(productDetailSlice.actions.fetchStart())
    //     const { data } = await axios.get(`/v1/touristRoutes/${touristRouteId}`)
    //     dispatch(productDetailSlice.actions.fetchSuccess(data))
    //   } catch (error: any) {
    //     dispatch(productDetailSlice.actions.fetchFail(error.message))
    //   }
    // }

    // fetchData()
    dispatch(getProductDetail(touristRouteId))
  }, [])

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
    return <div>????????????: {error}</div>
  }

  return (
    <>
      <MainLayout>
        {/* ???????????? ??? ???????????? */}
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.shortDescription}
                price={product.price}
                coupons={product.coupons}
                points={product.points}
                discount={product.discount}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p: any) => p.url)}
              />
            </Col>
            <Col span={11}>
              <Button
                style={{
                  marginTop: 50,
                  marginBottom: 30,
                  display: "block",
                }}
                type="primary"
                danger
                loading={shoppingCartLoading}
                onClick={() => {
                  dispatch(
                    addShoppingCartItem({ jwt, touristRouteId: product.id }),
                  )
                }}
              >
                <ShoppingCartOutlined />
                ???????????????
              </Button>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>

        {/* ???????????? */}
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#feature" title="????????????"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Anchor.Link href="#fees" title="??????"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#notes" title="????????????"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#comments" title="????????????"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>

        {/* ???????????? */}
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>????????????</Typography.Title>
          </Divider>

          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>

        {/* ?????? */}
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>??????</Typography.Title>
          </Divider>

          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>

        {/* ???????????? */}
        <div id="notes" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>????????????</Typography.Title>
          </Divider>

          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>

        {/* ???????????? */}
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation="center">
            <Typography.Title level={3}>????????????</Typography.Title>
          </Divider>

          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      </MainLayout>
    </>
  )
}
