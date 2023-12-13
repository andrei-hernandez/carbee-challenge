import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
  token: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {

  const data = JSON.stringify({
    "username": req.body.username,
    "password": req.body.password
  })

  const config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  }

  const response = await axios.request(config)
  res.status(200).json({ token: response.data.token })
}
