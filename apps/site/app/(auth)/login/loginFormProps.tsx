import { LoginInput } from "@/../../@tacotacIO/codegen/dist";

import { sdk } from "@/lib/sdk";
import { Field, GenericFormProps } from "@/components/form/types";

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
      type: "password",
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
