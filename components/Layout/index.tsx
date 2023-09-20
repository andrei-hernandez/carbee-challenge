import React, { FunctionComponent, PropsWithChildren } from "react"
import { Layout, theme } from "antd"
import { SideNavigation } from "./SideNavigation"
import { Header } from "./Header"

export const AppLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <div className="main-container-skeleton">
      <Layout style={{ minHeight: "100vh" }} hasSider>
        <SideNavigation />
        <Layout style={{ marginLeft: 200 }}>
          <Header
            colorBgContainer={colorBgContainer} />
          <Layout.Content
            style={{
              overflow: "initial",
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer
            }}>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  )
}
