import { LoginInput } from "@tacotacIO/codegen/dist";

import { sdk } from "@/lib/sdk";
import { Field, GenericFormProps } from "@/components/generic/generic-form";

export const getLoginFormProps: () => GenericFormProps<LoginInput> = () => {
  const fields: Field<LoginInput>[] = [
    {
      name: "username",
      type: "text",
      label: "Email",
      initialValue: "",
    },

    {
      name: "password",
      type: "text",
      label: "Password",
      initialValue: "",
    },
  ];
  const onSubmit = async (data: LoginInput) => {
    console.log("created", data);
    await sdk().Login({
      input: {
        ...data,
      },
    });
  };
  return {
    fields,
    action: "create",
    onSubmit,
  };
};
