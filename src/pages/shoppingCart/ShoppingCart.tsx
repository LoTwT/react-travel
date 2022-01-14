import styles from "./ShoppingCart.module.css"
import { Row, Col, Affix } from "antd"
import { MainLayout } from "../../layouts/mainLayout"
import { ProductList, PaymentCard } from "../../components"
import { useSelector } from "../../redux/hooks"
import { useDispatch } from "react-redux"
import { clearShoppingCartItem, checkout } from "../../redux/shoppingCart/slice"
import { useHistory } from "react-router-dom"

export const ShoppingCart = () => {
  const { loading: shoppingCartLoading, items: shoppingCartItems } =
    useSelector((state) => state.shoppingCart)
  const jwt = useSelector((state) => state.user.token) as string
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList data={shoppingCartItems.map((s) => s.touristRoute)} />
          </div>
        </Col>

        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={shoppingCartLoading}
                originalPrice={shoppingCartItems
                  .map((s) => s.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItems
                  .map(
                    (s) =>
                      s.originalPrice *
                      (s.discountPresent ? s.discountPresent : 1),
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if (shoppingCartItems.length <= 0) return
                  dispatch(checkout(jwt))
                  history.push("/placeOrder")
                }}
                onShoppingCartClear={() => {
                  dispatch(
                    clearShoppingCartItem({
                      jwt,
                      itemIds: shoppingCartItems.map((s) => s.id),
                    }),
                  )
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  )
}
