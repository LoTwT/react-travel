import { useEffect } from "react"

import styles from "./SignInForm.module.css"
import { Form, Input, Button, Checkbox } from "antd"
import { signIn } from "../../redux/user/slice"
import { useDispatch } from "react-redux"
import { useSelector } from "../../redux/hooks"
import { useHistory } from "react-router-dom"

export const SignInForm = () => {
  const { loading, error, token: jwt } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (jwt !== null) history.push("/")
  }, [jwt])

  const onFinish = (values: any) => {
    dispatch(
      signIn({
        email: values.username,
        password: values.password,
      }),
    )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Form
      className={styles["sign-in-form"]}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
