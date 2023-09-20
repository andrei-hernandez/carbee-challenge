import { Button, Col, DatePicker, List, Row, Space, message } from "antd"
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

    const [messageApi, contextHolder] = message.useMessage()

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

    const success = (selectedDate: string): void => {
      messageApi.success(`Scheduled at: ${selectedDate}`)
    }

    return (
      <>
        {contextHolder}
        <Row className="search-availability-panel" gutter={[20, 10]}>
          <Col span={10}>
            <DatePicker
              defaultValue={dayjs(Date.now()).add(1, "day")}
              onChange={(date: dayjs.Dayjs | null, dateString: string): void =>
                setSelectedDate(dateString)}
              disabledDate={(current: dayjs.Dayjs): boolean =>
                dayjs(current).isBefore(dayjs(Date.now()))
              }
              className="search-availability-datepicker" />
          </Col>
          <Col span={14}>
            <Button
              onClick={handleSearchAvailability}
              className="search-availability-button"
              type="primary">
              Search Availability
            </Button>
          </Col>
          <Col span={24}>
            <List
              dataSource={availableDates}
              renderItem={(date: string): React.JSX.Element => (
                <List.Item actions={[<Button
                  key="schedule" onClick={(): void => success(dayjs(date).format("dddd, MMMM D, YYYY HH:mm"))}>Schedule</Button>]}>
                  <Space>
                    {dayjs(date).format("dddd, MMMM D, YYYY HH:mm")}
                  </Space>
                </List.Item>
              )
              } />
          </Col>
        </Row>
      </>
    )
  }
