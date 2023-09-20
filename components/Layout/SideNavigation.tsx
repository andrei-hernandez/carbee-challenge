import React, { FunctionComponent, useState } from "react"
import { ScheduleOutlined } from "@ant-design/icons"
import { Layout, Menu, Typography } from "antd"
import { useRouter } from "next/router"

export const SideNavigation: FunctionComponent = () => {
  const router = useRouter()
  const currentUrl = useRouter().pathname.replace("/", "")
  const [currentPage, setCurrentPage] = useState(currentUrl)

  const handleRouting = (route: string): void => {
    setCurrentPage(route)
    router.push(`/${route}`)
  }

  return (
    <Layout.Sider
      trigger={null}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 2
      }}>
      <div className="logo">
        <Typography.Text className="logo-title">
          Carbee Challenge
        </Typography.Text>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentPage]}
        items={[
          {
            key: "Dashboard",
            icon: <ScheduleOutlined />,
            onClick: (): void => handleRouting("dashboard"),
            label: "Dashboard "
          }
        ]} />
    </Layout.Sider>
  )
}
