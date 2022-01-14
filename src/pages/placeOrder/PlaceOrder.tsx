import { MainLayout } from "../../layouts/mainLayout"
import styles from "./PlaceOrder.module.css"
import { Row, Col } from "antd"
import { CheckOutCard, PaymentForm } from "../../components"

export const PlaceOrder = () => {
  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>

        <Col span={12}>{/* <CheckOutCard /> */}</Col>
      </Row>
    </MainLayout>
  )
}
