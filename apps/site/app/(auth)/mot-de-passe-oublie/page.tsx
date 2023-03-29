import Link from "next/link"

import { ForgotPasswordForm } from "./ForgotPasswordForm"

export default async function ForgotPassordPage() {
  return (
    <div>
      <h1>Mot de passe oublié</h1>

      <ForgotPasswordForm />
      <p>
        <Link href="/login">Go to login</Link>
      </p>
    </div>
  )
}
