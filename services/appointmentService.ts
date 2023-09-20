import { AppointmentConnection } from "@/types/API"
import { IAppointment } from "@/types/Appointment"
import axios from "axios"

export const getAppointments = async (token: string): Promise<Array<IAppointment>> => {
  const rawAppointmentsResponse = await axios.get<AppointmentConnection>(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`, { headers: { Authorization: `Bearer ${token}` } })

  console.info("GET Appointments Response", rawAppointmentsResponse.data)
  return rawAppointmentsResponse.data.edges.map(edge => edge.node)
}
