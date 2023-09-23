import { FunctionComponent, useState } from "react"
import dayjs from "dayjs"
import { parseCookies } from "nookies"
import axios from "axios"

interface IAvailableDatesPanelProps {
  InitialAvailableDates: Array<string>
}

export const AvailableDatesPanel: FunctionComponent<IAvailableDatesPanelProps>
  = ({ InitialAvailableDates }) => {

    const [availableDates, setAvailableDates] = useState(InitialAvailableDates)
    const [selectedDate, setSelectedDate] = useState<string>(dayjs(Date.now()).add(1, "day").format("YYYY-MM-DD"))

    const handleSearchAvailability = async (): Promise<void> => {
      const { token } = parseCookies()
      const response = await axios.get<{ availableDates: Array<string> }>(
        `/api/availability/${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      setAvailableDates(response.data.availableDates)
    }

    return (
      <div className="search-availability-panel">
        <div>
          <input
            type="date"
            placeholder="Select a date"
            value={selectedDate}
            min={dayjs(Date.now()).add(1, "day").add(5, "hour").format("YYYY-MM-DD")}
            onChange={(e): void => setSelectedDate(e.target.value)}
            className="search-availability-datepicker" />
        </div>
        <div>
          <button
            onClick={handleSearchAvailability}
            className="search-availability-button"
            type="button">
            Search Availability
          </button>
        </div>
        <div className="available-dates-list">
          {availableDates.map((date: string) => (
            <div className="available-date-item" key={date}>
              {dayjs(date).format("dddd, MMMM D, YYYY HH:mm")}
            </div>
          ))}
        </div>
      </div>
    )
  }
