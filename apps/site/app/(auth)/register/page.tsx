import Link from "next/link"

import { GenericForm } from "@/components/generic/generic-form"
import { RegisterForm } from "./RegisterForm"
import { getRegisterFormProps } from "./getRegisterFormProps"

export default async function RegisterPage() {
  return (
    <div>
      <h1>Register</h1>

      <RegisterForm />
      <p>
        <Link href="/login">Go to login</Link>
      </p>
    </div>
  )
}
