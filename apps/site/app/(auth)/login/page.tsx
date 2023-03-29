import Link from "next/link"

import { LoginForm } from "./LoginForm"

export default async function LoginPage() {
  return (
    <div>
      <h1>Register</h1>

      <LoginForm />
      <p>
        <Link href="/login">Go to register</Link>
      </p>
    </div>
  )
}
