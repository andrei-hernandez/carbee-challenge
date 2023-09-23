import React from "react"
import { AppointmentCard } from "@/components/Appointment/AppointmentCard"
import { GetServerSideProps } from "next"
import { IAppointment } from "@/types/Appointment"
import { AvailableDatesPanel } from "@/components/AvailableDates/AvailableDatesPanel"
import { checkAuth } from "@/utils/checkAuth"
import { getAppointments } from "@/services/appointmentService"
import { getAvailableDates } from "@/services/availableDatesService"
import { destroyCookie } from "nookies"
import { useRouter } from "next/router"

interface IDashboardPageProps {
  appointments: Array<IAppointment>
  availableDates: Array<string>
}

export default function Dashboard ({ appointments, availableDates }: IDashboardPageProps): React.JSX.Element {

  const router = useRouter()

  return (
    <div>
      <div className="dashboard-nav">
        <button
          onClick={(): void => {
            destroyCookie(null, "token")
            router.push("/login")
          }} type="button">Logout</button>
      </div>
      <div className="dashboard-header">
        <div className="appointments-title">
          <h2>
            Appointments
          </h2>
        </div>
        <div className="available-dates-title">
          <h2>
            Available Dates
          </h2>
        </div>
      </div>
      <div className="dashboard-content">
        <div>
          <div className="appointments-grid">
            {/* // replace this for a natural list */}
            {appointments.map((appointment: IAppointment) => (
              <AppointmentCard
                key={appointment.id}
                item={appointment} />))}
          </div>
        </div>
        <div>
          <AvailableDatesPanel InitialAvailableDates={availableDates} />
        </div>
      </div>
    </div>
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
