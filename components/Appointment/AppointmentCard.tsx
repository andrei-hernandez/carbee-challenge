import React, { FunctionComponent } from "react"
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
      <div className="appointment-card-body" title="March 29, 2023">
        <div className="appointment-card-content">
          <div>
            <div>
              <div style={{ fontSize: "18px" }}>
                {statusStore[item.status]}
              </div>
              <div style={{ fontSize: "18px", opacity: "80%" }}>
                {buildHours(item.scheduledTime)} - {item.status === status.COMPLETE
                  ? buildFinishTime(item.scheduledTime, item.duration)
                  : `TBD (ETA: ${buildFinishTime(item.scheduledTime, item.duration)} - ${item.duration} minutes)`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <div>
              <div>
                Service
              </div>
              <div style={{ fontSize: "18px", opacity: "80%" }}>
                {item.workOrder.service}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
