import { LoginForm } from "@/components/Auth/LoginForm"
import { ILoginResponse } from "@/types/API"
import { ILoginForm } from "@/types/Auth"
import { Card } from "antd"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import nookies from "nookies"

export default function Login (): React.JSX.Element {
  const router = useRouter()

  const onSubmit = async (formValues: ILoginForm): Promise<void> => {
    const { email, password } = formValues
    try {
      const data = JSON.stringify({
        "username": email,
        "password": password
      })

      const loginResponse =
        await axios.request<ILoginResponse>({
          method: "post",
          maxBodyLength: Infinity,
          url: "api/auth",
          headers: {
            "Content-Type": "application/json"
          },
          data: data
        })
      const token = loginResponse.data.token
      nookies.set(null, "token", token)
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="login-page">
      <Card
        headStyle={{ textAlign: "center", fontSize: "1.5rem" }}
        title="Log In"
        className="login-card-container">
        <LoginForm onSubmit={onSubmit} />
      </Card>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const token = nookies.get(context, "token")

  if (typeof token === "string") {
    context.res.writeHead(302, { Location: "/" })
    context.res.end()
  }
  return {
    props: {}
  }
}
