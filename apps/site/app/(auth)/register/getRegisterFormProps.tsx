import { RegisterInput } from "@/../../@chez-daddy/codegen/dist"

import { sdk } from "@/lib/sdk"
import { Field, GenericFormProps } from "@/components/generic/generic-form"

export const getRegisterFormProps: () => GenericFormProps<RegisterInput> =
  () => {
    const fields: Field<RegisterInput>[] = [
      {
        name: "email",
        type: "text",
        label: "Email",
        initialValue: "",
      },
      {
        name: "firstname",
        type: "text",
        label: "First Name",
        initialValue: "",
      },
      {
        name: "lastname",
        type: "text",
        label: "Last Name",
        initialValue: "",
      },
      {
        name: "password",
        type: "text",
        label: "Password",
        initialValue: "",
      },
    ]
    const onSubmit = async (data: RegisterInput) => {
      console.log("created", data)
      await sdk().RegisterUser({
        input: {
          ...data,
          username:
            // firstname plus a 6 char hash
            data.firstname + Math.random().toString(36).substring(2, 8),
        },
      })
    }
    return {
      fields,
      action: "create",
      onSubmit,
    }
  }
