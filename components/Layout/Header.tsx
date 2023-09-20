import React, { FunctionComponent } from "react"
import { Layout, Button, Row, Col } from "antd"
import { useRouter } from "next/router"
import { destroyCookie } from "nookies"

interface IHeaderProps {
  colorBgContainer: string
}

export const Header: FunctionComponent<IHeaderProps> = ({ colorBgContainer }) => {

  //const { logOut } = useFirebaseAuth()
  const router = useRouter()

  const handleLogOut = (): void => {
    destroyCookie(null, "token")
    router.push("/login")
  }

  return (
    <Layout.Header
      style={{
        padding: 0,
        background: colorBgContainer
      }}>
      <Row justify="end">
        <Col className="header-logout-button">
          <Button onClick={handleLogOut}>
            <span>Logout</span>
          </Button>
        </Col>
      </Row>
    </Layout.Header>
  )
}
