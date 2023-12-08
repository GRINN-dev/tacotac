import { ForgotPasswordInput } from "@tacotacIO/codegen";

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
