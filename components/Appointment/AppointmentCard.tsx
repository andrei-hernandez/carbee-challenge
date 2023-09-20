import React, { FunctionComponent } from "react"
import { Card, Row, Col, Typography, Space } from "antd"
import { IAppointment } from "@/types/Appointment"

interface IAppointmentCardProps {
  item: IAppointment
}

export const AppointmentCard: FunctionComponent<IAppointmentCardProps> =
  ({ item }) => {

    const statusStore: { [key: string]: string } = {
      SCHEDULED: "Scheduled",
      PAID: "Paid",
      COMPLETE: "Completed",
      CANCELLED: "Cancelled"
    }

    enum status {
      SCHEDULED = "SCHEDULED",
      PAID = "PAID",
      COMPLETE = "COMPLETE",
      CANCELLED = "Cancelled"
    }

    const buildHours = (dateToBuild: string): string => {
      const date = new Date(dateToBuild)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const hours12 = hours % 12 || 12
      const minutesString = minutes < 10 ? `0${minutes}` : minutes
      return `${hours12}:${minutesString} ${hours >= 12 ? "PM" : "AM"}`
    }

    const buildFinishTime = (dateToBuild: string, duration: number): string => {
      //use the duration parameter to calc the finish time
      const date = new Date(dateToBuild)
      date.setMinutes(date.getMinutes() + duration)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const hours12 = hours % 12 || 12
      const minutesString = minutes < 10 ? `0${minutes}` : minutes
      return `${hours12}:${minutesString} ${hours >= 12 ? "PM" : "AM"}`
    }

    return (
      <Card title="March 29, 2023">
        <Row className="appointment-card-content">
          <Col span={24}>
            <Space direction="vertical" size={0}>
              <Typography.Text style={{ fontSize: "18px" }}>
                {statusStore[item.status]}
              </Typography.Text>
              <Typography.Text style={{ fontSize: "18px", opacity: "80%" }}>
                {buildHours(item.scheduledTime)} - {item.status === status.COMPLETE
                  ? buildFinishTime(item.scheduledTime, item.duration)
                  : `TBD (ETA: ${buildFinishTime(item.scheduledTime, item.duration)} - ${item.duration} minutes)`}
              </Typography.Text>
            </Space>
          </Col>
          <Col span={24} style={{ marginTop: "1rem" }}>
            <Space direction="vertical" size={0}>
              <Typography.Title level={5} color="">
                Service
              </Typography.Title>
              <Typography.Text style={{ fontSize: "18px", opacity: "80%" }}>
                {item.workOrder.service}
              </Typography.Text>
            </Space>
          </Col>
        </Row>
      </Card>
    )
  }
