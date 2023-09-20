import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
  availableDates: Array<string>
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/availability/${req.query.date}`

  const config = {
    method: "get",
    url,
    headers: {
      "Content-Type": "application/json",
      "Authorization": req.headers.authorization
    }
  }

  const response = await axios.request<Array<string>>(config)
  console.info("GET Available Dates Response", response.data)
  res.status(200).json({ availableDates: response.data })
}
