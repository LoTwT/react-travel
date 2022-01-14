import styles from "./ShoppingCart.module.css"
import { Row, Col, Affix } from "antd"
import { MainLayout } from "../../layouts/mainLayout"
import { ProductList, PaymentCard } from "../../components"

export const ShoppingCart = () => {
  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            {/* <ProductList /> */}
          </div>
        </Col>

        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              {/* <PaymentCard /> */}
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  )
}
