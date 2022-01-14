import { MainLayout } from "../../layouts/mainLayout"
import { Row, Col } from "antd"
import { CheckOutCard, PaymentForm } from "../../components"
import { useSelector } from "../../redux/hooks"
import { useDispatch } from "react-redux"
import { placeOrder } from "../../redux/order/slice"

export const PlaceOrder = () => {
  const jwt = useSelector((state) => state.user.token) as string
  const { loading, currentOrder: order } = useSelector((state) => state.order)
  const dispatch = useDispatch()

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>

        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(placeOrder({ jwt, orderId: order.id }))
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  )
}
