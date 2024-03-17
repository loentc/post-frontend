"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const CustomProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            hashed: false,
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </SessionProvider>
  );
};
