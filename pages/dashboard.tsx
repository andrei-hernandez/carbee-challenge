import React from "react"
import { Row, Col, List, Layout, Typography } from "antd"
import { AppointmentCard } from "@/components/Appointment/AppointmentCard"
import { AppLayout } from "@/components/Layout"
import { GetServerSideProps } from "next"
import { IAppointment } from "@/types/Appointment"
import { AvailableDatesPanel } from "@/components/AvailableDates/AvailableDatesPanel"

interface IDashboardPageProps {
  appointments: Array<IAppointment>
  availableDates: Array<string>
}

export default function Dashboard ({ appointments, availableDates }: IDashboardPageProps): React.JSX.Element {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const appointments: Array<IAppointment> =
    [
      {
        id: "64e3dd82621ec5bb91c9773d",
        paymentId: "pm_7Ff32kK1Cj",
        userId: "u_2ff6KJ2io445d",
        duration: 211,
        scheduledTime: "2023-08-16T21:13:18.371Z",
        status: "SCHEDULED",
        workOrder: { service: "Brake Fluid" }
      },
      {
        id: "64e3dd828fb675a1287316fe",
        paymentId: "pm_7Ff32kK1Cj",
        userId: "u_2ff6KJ2io445d",
        duration: 270,
        scheduledTime: "2023-08-12T21:41:47.934Z",
        status: "COMPLETE",
        workOrder: { service: "Air Conditioning Repair" }
      },
      {
        id: "64e3dd82eda6215f916ed931",
        paymentId: "pm_7Ff32kK1Cj",
        userId: "u_2ff6KJ2io445d",
        duration: 185,
        scheduledTime: "2023-08-12T19:05:51.533Z",
        status: "SCHEDULED",
        workOrder: { service: "Brake Fluid" }
      },
      {
        id: "64e3dd82e351e90db5e43278",
        paymentId: "pm_7Ff32kK1Cj",
        userId: "u_2ff6KJ2io445d",
        duration: 307,
        scheduledTime: "2023-08-06T10:08:43.111Z",
        status: "SCHEDULED",
        workOrder: { service: "Flux Capacitor Callabration" }
      },
      {
        id: "64e3dd82666a47020c142c9d",
        paymentId: "pm_7Ff32kK1Cj",
        userId: "u_2ff6KJ2io445d",
        duration: 62,
        scheduledTime: "2023-07-15T14:52:14.519Z",
        status: "SCHEDULED",
        workOrder: { service: "Blinker Fluid" }
      }
    ]

  const availableDates: Array<string> = [
    "2023-09-21T08:00:00.000Z",
    "2023-09-21T09:00:00.000Z",
    "2023-09-21T10:00:00.000Z",
    "2023-09-21T11:00:00.000Z",
    "2023-09-21T12:00:00.000Z",
    "2023-09-21T13:00:00.000Z",
    "2023-09-21T14:00:00.000Z"
  ]

  return {
    props: {
      appointments,
      availableDates
    }
  }
}
