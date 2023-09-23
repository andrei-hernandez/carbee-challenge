
import { ILoginForm } from "@/types/Auth"
import React, { FunctionComponent, useState } from "react"

interface ILoginFormProps {
  onSubmit: (formValues: ILoginForm) => Promise<void>
}

export const LoginForm: FunctionComponent<ILoginFormProps> = ({ onSubmit }): JSX.Element => {

  const [formValues, setFormValues] = useState<{ username: string, password: string }>({ username: "", password: "" })

  const handleSubmit = async (): Promise<void> => {
    await onSubmit({ email: formValues.username, password: formValues.password })
  }

  return (
    <form
      className="login-card-form">
      <div className="login-form">
        <div className="login-item">
          <span className="username-label">
            Username
          </span>
          <input
            onChange={({ target: { value } }): void =>
              setFormValues(prevState => ({ ...prevState, username: value }))}
            type="text"
            title="username" />
        </div>
        <div className="login-item">
          <span className="password-label">
            Password
          </span>
          <input
            onChange={({ target: { value } }): void =>
              setFormValues(prevState => ({ ...prevState, password: value }))}
            type="password"
            title="password" />
        </div>
        <div>
          <button
            type="button"
            onClick={(): Promise<void> => handleSubmit()}
            className="login-form-button">
            Log in
          </button>
        </div>
      </div>
    </form>
  )
}
