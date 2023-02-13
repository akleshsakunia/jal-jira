import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import auth from "../../utils/auth";
import { message } from "antd";

interface SigninProps {}

export default () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      const res = await api.login(values);
      if (res)
        auth.login(res, () => navigate("/app/dashboard", { replace: true }));
    } catch (e) {
      message.error("Username or password invalid !!");
    }
  };

  return (
    <Row justify="space-around" align="middle" style={{ minHeight: "100vh" }}>
      <Col flex="300px">
        <Form
          name="normal_login"
          className="login-form height-50"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="/signup">register now!</a>
          </Form.Item>

          <Form.Item>
            <GoogleCircleFilled />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
