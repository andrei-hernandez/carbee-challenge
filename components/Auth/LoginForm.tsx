import { Button, Col, Form, Input, Row } from "antd"
import { ILoginForm } from "@/types/Auth"
import React, { FunctionComponent } from "react"

interface ILoginFormProps {
  onSubmit: (formValues: ILoginForm) => Promise<void>
}

export const LoginForm: FunctionComponent<ILoginFormProps> = ({ onSubmit }): JSX.Element => {

  const [form] = Form.useForm()

  const handleSubmit = async (): Promise<void> => {
    await form.validateFields()
    const values = form.getFieldsValue()
    await onSubmit(values)
  }

  return (
    <Form
      form={form}
      className="login-card-form"
      layout="vertical"
      initialValues={{ remember: true }}>
      <Row className="login-form">
        <Col span={24}>
          <Form.Item
            label="Username"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}>
            <Input type="email" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={(): Promise<void> => handleSubmit()}
            className="login-form-button">
            Log in
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
