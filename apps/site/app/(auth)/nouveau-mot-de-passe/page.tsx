import Link from "next/link"

import { ResetPasswordForm } from "./ResetPasswordForm"

export default async function ResetPasswordPage() {
  return (
    <div>
      <h1>Nouveau mot de passe</h1>

      <ResetPasswordForm />
      <p>
        <Link href="/login">Go to login</Link>
      </p>
    </div>
  )
}
