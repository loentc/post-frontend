"use client";
import React from "react";
import { Button, Flex, Layout } from "antd";
import { signOut } from "next-auth/react";
import { LogoutOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const PostLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout>
        <Header>
          <Button
            className="mr-4"
            type="primary"
            icon={<LogoutOutlined />}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Log Out
          </Button>
          <Button type="primary" href="/post">
            Post
          </Button>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Flex>
  );
};

export default PostLayout;
