import { ForgotPasswordInput } from "@/../../@tacotacIO/codegen/dist";

import { sdk } from "@/lib/sdk";
import { Field, GenericFormProps } from "@/components/form/types";

export const getForgotPasswordFormProps: () => GenericFormProps<ForgotPasswordInput> = () => {
  const fields: Field<ForgotPasswordInput>[] = [
    {
      name: "email",
      type: "text",
      label: "Email",
      initialValue: "",
    },
  ];
  const onSubmit = async (data: ForgotPasswordInput) => {
    console.log("created", data);
    await sdk().ForgotPassword({
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