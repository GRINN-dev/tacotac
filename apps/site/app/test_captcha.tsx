"use client";

export const TestCaptcha = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_CAPTCHA_KEY_SITE, { action: "submit" })
        .then(async (token) => {
          /* send data to the server */

          const body = {
            gRecaptchaToken: token,
          };

          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/verify_captcha`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            if (response.ok) {
              const json = await response.json();
            } else {
              throw new Error(response.statusText);
            }
          } catch (error) {
            console.log(" test_captcha.tsx:38 ~ .then ~ error:", error);
          }

          /* End of the sending data */
        })
        .catch((error) => {
          console.log("🚀 ~ file: test_captcha.tsx:45 ~ window.grecaptcha.ready ~ error:", error.message);
        });
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Plop" />
      </form>
    </>
  );
};
