import { LoginForm } from "@/components/Auth/LoginForm"
import { ILoginForm } from "@/types/Auth"
import { Card } from "antd"
import { useRouter } from "next/router"

export default function Login (): React.JSX.Element {
  const router = useRouter()

  const onSubmit = async (formValues: ILoginForm): Promise<void> => {
    const { email, password } = formValues
    try {
      //await logIn(email, password)
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="login-page">
      <Card
        style={{ width: 450 }}
        headStyle={{ textAlign: "center", fontSize: "1.5rem" }}
        title="Log In"
        className="login-card-container">
        <LoginForm onSubmit={onSubmit} />
      </Card>
    </div>
  )
}
