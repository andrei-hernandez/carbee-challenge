import axios from "axios"
import dayjs from "dayjs"

export const getAvailableDates = async (token: string, date?: string): Promise<Array<string>> => {

  const queryDate = date ?? dayjs(Date.now()).add(1, "day").add(5, "hour").format("YYYY-MM-DD") //for avoid UTC incompatibilities i need to add two days to the date
  const response = await axios.get<Array<string>>(`${process.env.NEXT_PUBLIC_API_URL}/api/availability/${queryDate}`, { headers: { Authorization: `Bearer ${token}` } })

  return response.data
}
