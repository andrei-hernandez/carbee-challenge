import React from "react"
import { Row, Col, List, Layout, Typography } from "antd"
import { AppointmentCard } from "@/components/Appointment/AppointmentCard"
import { AppLayout } from "@/components/Layout"
import { GetServerSideProps } from "next"
import { IAppointment } from "@/types/Appointment"
import { AvailableDatesPanel } from "@/components/AvailableDates/AvailableDatesPanel"
import { checkAuth } from "@/utils/checkAuth"
import { getAppointments } from "@/services/appointmentService"
import { getAvailableDates } from "@/services/availableDatesService"

interface IDashboardPageProps {
  appointments: Array<IAppointment>
  availableDates: Array<string>
}

export default function Dashboard ({ appointments, availableDates }: Readonly<IDashboardPageProps>): React.JSX.Element {
  return (
    <AppLayout>
      <Layout>
        <Layout.Header
          style={{
            top: 0,
            zIndex: 2,
            padding: 0,
            width: "100%",
            position: "sticky",
            background: "#fff"
          }}>
          <Row justify="space-around">
            <Col>
              <Typography.Title className="appointments-title">
                Appointments
              </Typography.Title>
            </Col>
            <Col>
              <Typography.Title className="available-dates-title">
                Available Dates
              </Typography.Title>
            </Col>
          </Row>
        </Layout.Header>
        <Layout.Content style={{
          background: "#ffff",
          padding: 0,
          margin: 0
        }}>
          <Row
            justify="center" align="top"
            gutter={[100, 10]}>
            <Col span={12}>
              <List
                pagination={{
                  pageSize: 8,
                  align: "end"
                }}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1
                }}
                dataSource={appointments}
                renderItem={(appointment: IAppointment): React.JSX.Element => (
                  <List.Item>
                    <AppointmentCard
                      item={appointment} />
                  </List.Item>
                )} />
            </Col>
            <Col span={12}>
              <AvailableDatesPanel InitialAvailableDates={availableDates} />
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {

  const token = checkAuth(ctx)
  const appointments: Array<IAppointment> = await getAppointments(token.token)
  const availableDates: Array<string> = await getAvailableDates(token.token)

  return {
    props: {
      appointments,
      availableDates
    }
  }
}
