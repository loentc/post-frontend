"use client";
import { Button, Form, FormInstance, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";
import React from "react";

interface SignInProp {
  username: string;
  password: string;
}

function Login() {
  const formRef = React.createRef<FormInstance>();

  const handleSignin = (values: SignInProp) => {
    signIn("credentials", {
      username: values?.username,
      password: values?.password,
      redirect: true,
      callbackUrl: "/post",
    });
  };

  return (
    <div>
      <div className="flex justify-center my-8">
        <h1 style={{ fontSize: "30px" }}>Log In Post Application</h1>
      </div>
      <div className="flex justify-center my-8">
        <Form
          ref={formRef}
          name="loginForm"
          onFinish={handleSignin}
          className="signin-form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter username!" }]}
          >
            <Input
              placeholder="Enter username"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.40)" }} />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter password!" }]}
          >
            <Input.Password
              placeholder="Enter password"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.50)" }} />}
            />
          </Form.Item>

          <div className="flex justify-center">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
