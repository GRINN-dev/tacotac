"use client"

import { FC, useEffect, useRef } from "react"

declare var google: any

const loadScript = (src?: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement("script")
    if (src) {
      script.src = src
      script.onload = () => resolve()
      script.onerror = (err) => reject(err)
      document.body.appendChild(script)
    }
  })

export const GoogleAuth: FC<{
  clientId: string
  handleCredentialResponse: (response: {
    clientId: string
    credential: string
    select_by: string
  }) => void
}> = ({ clientId, handleCredentialResponse }) => {
  const googleButton = useRef(null)

  useEffect(() => {
    const src = "https://accounts.google.com/gsi/client"
    loadScript(src)
      .then(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(googleButton.current, {
          theme: "outline",
          size: "large",
          shape: "pill",
        })
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  }, [])

  return <div ref={googleButton}></div>
}
